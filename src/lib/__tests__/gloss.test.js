import { processGloss } from "../utils";

describe("processGloss", () => {
  it("should return an object with the correct properties", () => {
    const mockGloss = {
      title: { value: "Example title" },
      targetCollection: "Example collection",
      _document: { value: "Example document" },
      canonicalReference: { value: "Matthew 5:1" },
      _section: { value: "5" },
      _subsection: { value: "1" },
      creator: { value: "https://example.com" },
      tags: { items: ["Tag 1", "Tag 2"] },
      text: {
        format: "text/html",
        language: "la",
        textValue: "Lorem ipsum dolor sit amet",
      },
      description: { value: "Example description" },
      targetedText: { value: "Example targetedText" },
      notes: { value: "Some notes" },
    };
    const processedGloss = processGloss(mockGloss, "https://example.com");

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
      canonicalReference: "Matthew 5:1",
      description: "Example description",
      targetedText: "Example targetedText",
      notes: "Some notes",
    });
  });

  it("should return default values for falsy input", () => {
    const processedGloss = processGloss(null, "https://example.com");
    expect(processedGloss).toEqual({
      targetId: "",
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
});
