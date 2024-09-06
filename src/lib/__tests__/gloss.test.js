import { processGloss } from "../utils";

describe("processGloss", () => {
  it("should return an object with the correct properties", () => {
    const mockGlossList = [
      { title: { value: "Example title" } },
      { targetCollection: "Example collection" },
      { _document: { value: "Example document" } },
      { canonicalReference: { value: "Matthew 5:1" } },
      { _section: { value: "5" } },
      { _subsection: { value: "1" } },
      { creator: { value: "https://example.com" } },
      { tags: { items: ["Tag 1", "Tag 2"] } },
      {
        text: {
          format: "text/html",
          language: "la",
          textValue: "Lorem ipsum dolor sit amet",
        },
      },
      { themes: { value: ["Theme 1", "Theme 2"] } },
      { description: { value: "Example description" } },
      { targetedText: { value: "Example targetedText" } },
    ];
    const processedGloss = processGloss(mockGlossList, "https://example.com");

    expect(processedGloss).toEqual({
      targetId: "https://example.com",
      title: "Example title",
      targetCollection: "Example collection",
      section: "5",
      subsection: "1",
      tags: ["Tag 1", "Tag 2"],
      textFormat: "text/html",
      textLanguage: "la",
      textValue: "Lorem ipsum dolor sit amet",
      creator: "https://example.com",
      document: "Example document",
      themes: ["Theme 1", "Theme 2"],
      canonicalReference: "Matthew 5:1",
      description: "Example description",
      targetedText: "Example targetedText",
    });
  });

  it("should return default values for empty array input", () => {
    const emptyGlossList = [];
    const processedGloss = processGloss(emptyGlossList, "https://example.com");
    expect(processedGloss).toEqual({
      targetId: "https://example.com",
      title: "",
      targetCollection: "",
      section: "",
      subsection: "",
      tags: undefined,
      textFormat: undefined,
      textLanguage: undefined,
      textValue: undefined,
      creator: undefined,
      document: undefined,
      themes: undefined,
      canonicalReference: undefined,
      description: undefined,
      targetedText: undefined,
    });
  });
});
