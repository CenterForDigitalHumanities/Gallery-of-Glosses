"use client";

import { useState, useMemo } from "react";
import { type ProcessedFragment } from "@/lib/Fragment";
import { Button } from "@/components/ui/Button";
import * as NAV from "@/configs/navigation";

type ViewMode = "diff" | "curation";
type SortMode = "frequency" | "divergent";

interface VariantGroup {
  text: string;
  count: number;
  fragments: ProcessedFragment[];
}

/**
 * Normalize common medieval orthographic variants to a canonical form.
 * Applied in word order so longer replacements take precedence.
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

function normalizeOrthography(text: string): string {
  let result = text;
  for (const [pattern, replacement] of ORTHOGRAPHIC_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * Count word-level differences between two texts.
 */
function wordDiffDistance(textA: string, textB: string): number {
  const wordsA = textA.split(/\s+/).filter(Boolean);
  const wordsB = textB.split(/\s+/).filter(Boolean);
  const maxLen = Math.max(wordsA.length, wordsB.length);
  let distance = 0;
  for (let i = 0; i < maxLen; i++) {
    if (wordsA[i] !== wordsB[i]) distance++;
  }
  return distance;
}

/**
 * Groups witness fragments by their text value.
 * When normalizeOrthography is enabled, groups by normalized text.
 */
function groupByVariant(
  fragments: ProcessedFragment[],
  normalize: boolean
): VariantGroup[] {
  const map = new Map<string, ProcessedFragment[]>();

  for (const fragment of fragments) {
    const text = fragment.textValue ?? "";
    const key = normalize ? normalizeOrthography(text) : text;
    const existing = map.get(key) ?? [];
    existing.push(fragment);
    map.set(key, existing);
  }

  return Array.from(map.entries())
    .map(([text, frags]) => ({ text, count: frags.length, fragments: frags }));
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

  // Most divergent: sort by word diff distance from gloss text (ascending)
  return [...variants].sort(
    (a, b) =>
      wordDiffDistance(a.text, glossText) -
      wordDiffDistance(b.text, glossText)
  );
}

/**
 * Simple diff: highlights words that differ from the reference.
 */
function renderDiffLine(
  text: string,
  reference: string
): { word: string; different: boolean }[] {
  const textWords = text.split(/\s+/).filter(Boolean);
  const refWords = reference.split(/\s+/).filter(Boolean);
  const maxLen = Math.max(textWords.length, refWords.length);

  const parts: { word: string; different: boolean }[] = [];
  for (let i = 0; i < maxLen; i++) {
    const w = textWords[i] ?? "";
    const r = refWords[i] ?? "";
    parts.push({ word: w, different: w !== r });
  }
  return parts;
}

/**
 * Diff view: shows each variant inline with differences highlighted.
 */
function DiffView({
  variants,
  referenceText,
  sortMode,
}: {
  variants: VariantGroup[];
  referenceText: string;
  sortMode: SortMode;
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
        const diffParts = renderDiffLine(variant.text, ref);

        return (
          <div key={idx} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 border-b flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium shrink-0">
                Variant {idx + 1} ({variant.count} witness{variant.count > 1 ? "es" : ""})
                {isReference && " (most common)"}
                {isDivergent && idx > 0 && ` (diff vs variant ${idx})`} —
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
            <span className="text-sm font-medium shrink-0">Variant {idx + 1} —</span>
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
        />
      ) : (
        <CurationView variants={variants} />
      )}
    </div>
  );
}
