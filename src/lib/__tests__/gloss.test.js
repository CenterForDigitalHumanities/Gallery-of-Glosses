import { processGloss } from "../utils";

describe("processGloss", () => {
  it("should return an object with the correct properties from a flat property map", () => {
    const mockGlossProperties = {
      title: "Example title",
      targetCollection: "GoG-Named-Glosses",
      document: "Example document",
      canonicalReference: "Matthew 5:1",
      section: "5",
      subsection: "1",
      creator: "https://example.com",
      tags: { items: ["Tag 1", "Tag 2"] },
      text: {
        format: "text/html",
        language: "la",
        textValue: "Lorem ipsum dolor sit amet",
      },
      description: "Example description",
      targetedText: "Example targetedText",
      notes: "Example notes",
    };
    const processedGloss = processGloss(mockGlossProperties, "https://example.com");

    expect(processedGloss).toMatchObject({
      targetId: "https://example.com",
      title: "Example title",
      targetCollection: "GoG-Named-Glosses",
      section: "5",
      subsection: "1",
      tags: ["Tag 1", "Tag 2"],
      textFormat: "text/html",
      textLanguage: "la",
      textValue: "Lorem ipsum dolor sit amet",
      creator: "https://example.com",
      document: "Example document",
      canonicalReference: "Matthew 5:1",
      description: "Example description",
      targetedText: "Example targetedText",
      notes: "Example notes",
    });
  });

  it("should return default values for empty object input", () => {
    const emptyGloss = {};
    const processedGloss = processGloss(emptyGloss, "https://example.com");
    expect(processedGloss).toEqual({
      targetId: "https://example.com",
      title: "",
      targetCollection: "GoG-Named-Glosses",
      section: "",
      subsection: "",
      tags: [],
      textFormat: "",
      textLanguage: "",
      textValue: "",
      creator: "",
      document: "",
      canonicalReference: "",
      description: "",
      targetedText: "",
      notes: "",
    });
  });

  it("should return default ProcessedGloss when gloss or targetId is falsy", () => {
    const processedGloss = processGloss(null, "");
    expect(processedGloss.targetId).toBe("");
    expect(processedGloss.title).toBe("");
    expect(processedGloss.targetCollection).toBe("GoG-Named-Glosses");
  });

  it("should extract tags items array from tags.items", () => {
    const gloss = { tags: { items: ["tag-a", "tag-b", "tag-c"] } };
    const processedGloss = processGloss(gloss, "https://example.com");
    expect(processedGloss.tags).toEqual(["tag-a", "tag-b", "tag-c"]);
  });

  it("should fall back to empty array when tags.items is missing", () => {
    const gloss = { tags: {} };
    const processedGloss = processGloss(gloss, "https://example.com");
    expect(processedGloss.tags).toEqual([]);
  });

  it("should extract text sub-fields from the text property", () => {
    const gloss = {
      text: { format: "text/plain", language: "en", textValue: "Hello world" },
    };
    const processedGloss = processGloss(gloss, "https://example.com");
    expect(processedGloss.textFormat).toBe("text/plain");
    expect(processedGloss.textLanguage).toBe("en");
    expect(processedGloss.textValue).toBe("Hello world");
  });
});
