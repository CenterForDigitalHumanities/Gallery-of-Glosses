"use client";

import { useState, useMemo } from "react";
import { type ProcessedFragment } from "@/lib/Fragment";
import { Button } from "@/components/ui/Button";
import * as NAV from "@/configs/navigation";

type ViewMode = "diff" | "curation";
type SortMode = "frequency" | "divergent";

interface VariantGroup {
  /** Original text as it appears in the first witness (for display). */
  text: string;
  /** Normalized comparison key (tags stripped, punctuation removed, orthography canonicalized). */
  _key: string;
  count: number;
  fragments: ProcessedFragment[];
}

/**
 * Normalize text for comparison: strip XML-like tags, remove punctuation,
 * and canonicalize common medieval orthographic variants.
 * Applied in order so longer replacements take precedence.
 */
const ORTHOGRAPHIC_RULES: [RegExp, string][] = [
  [/exsp\b/gi, "exp"],
  [/ae/gi, "e"],
  [/oe/gi, "e"],
  [/v/gi, "u"],
  [/j/gi, "i"],
  [/y/gi, "i"],
  [/c/gi, "t"],
];

function normalizeForComparison(text: string): string {
  // Strip XML-like tags (e.g. <seg ref="Lt 6:13">...</seg>) but keep inner content
  let result = text.replace(/<[^>]+>/g, "");
  // Remove punctuation
  result = result.replace(/[\u2000-\u206F\u2E00-\u2E7F\.,;:!?'"\-\—\–\(\)\[\]{}]/g, "");
  // Apply orthographic rules
  for (const [pattern, replacement] of ORTHOGRAPHIC_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result.toLowerCase().trim();
}

/**
 * Compute the Longest Common Subsequence (LCS) of two word arrays.
 * Returns a boolean array for each input indicating which words are in the LCS.
 */
function lcsMask<T>(a: T[], b: T[]): { aMask: boolean[]; bMask: boolean[] } {
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const aMask = new Array(m).fill(false);
  const bMask = new Array(n).fill(false);
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      aMask[i - 1] = true;
      bMask[j - 1] = true;
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return { aMask, bMask };
}

/**
 * Count word-level edit distance using LCS.
 * edit_distance = len(a) + len(b) - 2 * len(lcs)
 */
function wordDiffDistance(keyA: string, keyB: string): number {
  const wordsA = keyA.split(/\s+/).filter(Boolean);
  const wordsB = keyB.split(/\s+/).filter(Boolean);
  const { aMask } = lcsMask(wordsA, wordsB);
  const lcsLen = aMask.filter(Boolean).length;
  return wordsA.length + wordsB.length - 2 * lcsLen;
}

/**
 * Groups witness fragments by their text value.
 * When normalize is enabled, groups by a normalized comparison key
 * (tags stripped, punctuation removed, orthography canonicalized)
 * but preserves the original text for display.
 */
function groupByVariant(
  fragments: ProcessedFragment[],
  normalize: boolean
): VariantGroup[] {
  const map = new Map<string, ProcessedFragment[]>();

  for (const fragment of fragments) {
    const text = fragment.textValue ?? "";
    const key = normalize ? normalizeForComparison(text) : text;
    const existing = map.get(key) ?? [];
    existing.push(fragment);
    map.set(key, existing);
  }

  return Array.from(map.entries())
    .map(([key, frags]) => ({
      text: frags[0].textValue ?? "",
      _key: key,
      count: frags.length,
      fragments: frags,
    }));
}

/**
 * Sort variants by the selected sort mode.
 */
function sortVariants(
  variants: VariantGroup[],
  sortMode: SortMode,
  glossText: string
): VariantGroup[] {
  if (sortMode === "frequency") {
    return [...variants].sort((a, b) => b.count - a.count);
  }

  // Most divergent: sort by word diff distance from normalized gloss text (ascending)
  const glossKey = normalizeForComparison(glossText);
  return [...variants].sort(
    (a, b) =>
      wordDiffDistance(a._key, glossKey) -
      wordDiffDistance(b._key, glossKey)
  );
}

/**
 * LCS-based diff: highlights words in `text` that are not part of the
 * longest common subsequence with `reference`.
 * When normalize is enabled, compares normalized forms but displays original words.
 */
function renderDiffLine(
  text: string,
  reference: string,
  normalize: boolean
): { word: string; different: boolean }[] {
  const textWords = text.split(/\s+/).filter(Boolean);
  const refWords = reference.split(/\s+/).filter(Boolean);

  const compareWords = (w: string) => normalize ? normalizeForComparison(w) : w;
  const textCompare = textWords.map(compareWords);
  const refCompare = refWords.map(compareWords);

  const { aMask } = lcsMask(textCompare, refCompare);

  return textWords.map((word, i) => ({
    word,
    different: !aMask[i],
  }));
}

/**
 * Diff view: shows each variant inline with differences highlighted.
 */
function DiffView({
  variants,
  referenceText,
  sortMode,
  normalize,
}: {
  variants: VariantGroup[];
  referenceText: string;
  sortMode: SortMode;
  normalize: boolean;
}) {
  if (variants.length === 0) return null;

  // In divergent mode, diff each variant against the previous one (or gloss text for first)
  const isDivergent = sortMode === "divergent";

  return (
    <div className="space-y-4">
      {variants.map((variant, idx) => {
        const ref = isDivergent
          ? idx === 0
            ? referenceText
            : variants[idx - 1].text
          : variants[0].text;
        const isReference = !isDivergent && idx === 0;
        const diffParts = renderDiffLine(variant.text, ref, normalize);

        return (
          <div key={idx} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 border-b flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium shrink-0">
<<<<<<< HEAD
                Variant {idx + 1} ({variant.count} witness{variant.count > 1 ? "es" : ""}){isReference && " (most common)"} —
=======
                Variant {idx + 1} ({variant.count} witness{variant.count > 1 ? "es" : ""})
                {isReference && " (most common)"}
                {isDivergent && idx > 0 && ` (diff vs variant ${idx})`} —
>>>>>>> phase-2
              </span>
              {variant.fragments.map((frag) => (
                <a
                  key={frag.targetId}
                  href={`${NAV.BASEPATH}/witness/${frag.targetId.split("/").pop()}`}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 transition-colors"
                >
                  {frag.identifier ?? frag.targetId.split("/").pop()}
                  {frag.folio && (
                    <span className="ml-1 text-muted-foreground">
                      f. {frag.folio}
                    </span>
                  )}
                </a>
              ))}
            </div>
            <div className="p-4 leading-relaxed">
              {diffParts.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.different
                      ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 px-0.5 rounded"
                      : ""
                  }
                >
                  {part.word}
                  {i < diffParts.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Curation view: shows each variant as a card with witness links below, ordered by frequency.
 */
function CurationView({ variants }: { variants: VariantGroup[] }) {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-4">
      {variants.map((variant, idx) => (
        <div
          key={idx}
          className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
        >
          <div className="bg-muted/50 px-4 py-2 border-b flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium shrink-0">
              Variant {idx + 1} — {variant.count} witness{variant.count > 1 ? "es" : ""}
            </span>
            {variant.fragments.map((frag) => (
              <a
                key={frag.targetId}
                href={`${NAV.BASEPATH}/witness/${frag.targetId.split("/").pop()}`}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 transition-colors"
              >
                {frag.identifier ?? frag.targetId.split("/").pop()}
                {frag.folio && (
                  <span className="ml-1 text-muted-foreground">
                    f. {frag.folio}
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="p-4">
            <p className="text-lg italic leading-relaxed">
              &lsquo; {variant.text} &rsquo;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * GlossAnalysis component: toggle between diff and curation views for
 * the variants of a gloss across its witness fragments.
 */
export function GlossAnalysis({
  fragments,
  glossText,
  loading,
}: {
  fragments: ProcessedFragment[];
  glossText?: string;
  loading: boolean;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("diff");
  const [sortMode, setSortMode] = useState<SortMode>("frequency");
  const [normalizeOrthography, setNormalizeOrthography] = useState(false);

  const variants = useMemo(
    () =>
      sortVariants(
        groupByVariant(
          fragments.filter((f) => f.textValue),
          normalizeOrthography
        ),
        sortMode,
        glossText ?? ""
      ),
    [fragments, sortMode, normalizeOrthography, glossText]
  );

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-24 bg-muted rounded-lg" />
        <div className="h-24 bg-muted rounded-lg" />
      </div>
    );
  }

  if (variants.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Gloss Analysis</h2>
        <div className="inline-flex rounded-lg border border-input bg-background shadow-sm">
          <Button
            variant={viewMode === "diff" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("diff")}
            className="rounded-none border-r border-input"
          >
            Diff
          </Button>
          <Button
            variant={viewMode === "curation" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("curation")}
            className="rounded-none"
          >
            Curation
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {variants.length} variant{variants.length > 1 ? "s" : ""} across{" "}
        {fragments.length} witness{fragments.length > 1 ? "es" : ""}
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={normalizeOrthography}
            onChange={(e) => setNormalizeOrthography(e.target.checked)}
            className="rounded border-input"
          />
          Normalize orthography
        </label>

        <div className="inline-flex rounded-lg border border-input bg-background shadow-sm">
          <Button
            variant={sortMode === "frequency" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortMode("frequency")}
            className="rounded-none border-r border-input"
          >
            Most frequent
          </Button>
          <Button
            variant={sortMode === "divergent" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortMode("divergent")}
            className="rounded-none"
          >
            Most divergent
          </Button>
        </div>
      </div>

      {viewMode === "diff" ? (
        <DiffView
          variants={variants}
          referenceText={glossText ?? ""}
          sortMode={sortMode}
          normalize={normalizeOrthography}
        />
      ) : (
        <CurationView variants={variants} />
      )}
    </div>
  );
}
