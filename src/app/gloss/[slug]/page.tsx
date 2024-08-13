"use client";

import { RERUM } from "@/configs/rerum-links";
import { useGlossInstance } from "@/hooks/useGlossInstance";
import { usePathname } from "next/navigation";

const parseGlossText = (text: string) => {
  const parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");

  // Replace each <SEG ref="..."> with italicized text
  const segElements = doc.querySelectorAll("SEG");
  segElements.forEach((segElement) => {
    // Add reference after text
    let refSpan = document.createElement("span");
    refSpan.textContent = ` (${segElement.getAttribute("ref") ?? "No reference found"})`;
    segElement.insertAdjacentElement("afterend", refSpan);

    // Change text to italic
    let span = document.createElement("span");
    span.style.fontStyle = "italic";
    span.textContent = segElement.textContent;
    segElement.replaceWith(span);
  });

  // Replace each <Target text="..."> with <span style="font-weight: bold" title="...">
  const targetElements = doc.querySelectorAll("Target");
  targetElements.forEach((targetElement) => {
    // Add reference after text
    let refSpan = document.createElement("span");
    refSpan.textContent = ` (${targetElement.getAttribute("text") ?? "No reference found"})`;
    targetElement.insertAdjacentElement("afterend", refSpan);

    // Change text to bold
    let span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.textContent = targetElement.textContent;
    targetElement.replaceWith(span);
  });

  return doc.body.innerHTML;
};

const GlossInstance = () => {
  const pathname = usePathname();

  const targetId = RERUM + pathname.split("/gloss/")[1];
  const gloss = useGlossInstance(targetId);

  const blurredStyles = "filter blur-md opacity-50";

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className={`text-2xl font-bold mb-4 ${!gloss && blurredStyles}`}>
          {gloss ? gloss.title : "4913490110934"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Collection:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.targetCollection : "4913490110934"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Chapter:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.section : "5"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Verse:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.subsection : "2"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Language:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.textLanguage : "73"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Format:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.textFormat : "491349/110934"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.tags : "4913, 4901, 10934"}
            </span>
          </p>
        </div>
        <div className="rounded-xl shadow-inner">
          <p className={`text-justify ${!gloss && blurredStyles}`}>
            {gloss && gloss.textValue ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: parseGlossText(gloss.textValue),
                }}
              />
            ) : (
              "Ex dolore ipsum quis pariatur nulla proident exercitation exercitation aliqua dolor dolor est cillum. Fugiat enim non reprehenderit in laborum voluptate ut exercitation et esse. Qui cupidatat irure in officia eu consectetur amet mollit exercitation excepteur fugiat occaecat in aute. Mollit nisi aliqua exercitation labore minim sunt ut id voluptate aliqua magna deserunt. Lorem magna ipsum culpa dolor ea veniam fugiat id officia. Irure qui culpa eiusmod laborum velit sunt velit ut anim consectetur anim mollit Lorem."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlossInstance;
