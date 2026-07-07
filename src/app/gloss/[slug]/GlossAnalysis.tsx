"use client";

import { useState, useMemo } from "react";
import { type ProcessedFragment } from "@/lib/Fragment";
import { Button } from "@/components/ui/Button";
import * as NAV from "@/configs/navigation";

type ViewMode = "diff" | "curation";

interface VariantGroup {
  text: string;
  count: number;
  fragments: ProcessedFragment[];
}

/**
 * Groups witness fragments by their text value, sorted by frequency (most common first).
 */
function groupByVariant(fragments: ProcessedFragment[]): VariantGroup[] {
  const map = new Map<string, ProcessedFragment[]>();

  for (const fragment of fragments) {
    const text = fragment.textValue ?? "";
    const existing = map.get(text) ?? [];
    existing.push(fragment);
    map.set(text, existing);
  }

  return Array.from(map.entries())
    .map(([text, fragments]) => ({ text, count: fragments.length, fragments }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Simple diff: highlights words that differ from the reference (most common variant).
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
 * Diff view: shows each variant inline with differences highlighted against the most common variant.
 */
function DiffView({ variants }: { variants: VariantGroup[] }) {
  if (variants.length === 0) return null;

  const reference = variants[0].text;

  return (
    <div className="space-y-4">
      {variants.map((variant, idx) => {
        const isReference = idx === 0;
        const diffParts = renderDiffLine(variant.text, reference);

        return (
          <div key={idx} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 border-b flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium shrink-0">
                Variant {idx + 1} ({variant.count} witness{variant.count > 1 ? "es" : ""}){isReference && " (most common)"} —
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
  loading,
}: {
  fragments: ProcessedFragment[];
  loading: boolean;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("diff");

  const variants = useMemo(
    () => groupByVariant(fragments.filter((f) => f.textValue)),
    [fragments]
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

      {viewMode === "diff" ? (
        <DiffView variants={variants} />
      ) : (
        <CurationView variants={variants} />
      )}
    </div>
  );
}
