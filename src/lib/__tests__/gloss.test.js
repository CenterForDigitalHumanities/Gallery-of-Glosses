import { GrabGlossProperties, processGloss } from "../utils";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("GrabGlossProperties", () => {
  const mockRequest = {
    json: jest.fn().mockResolvedValue({ targetId: "http://example.com" }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query", async () => {
    axios.post.mockResolvedValue({
      data: {
        targetId: "https://store.rerum.io/v1/id/614362c3e74876243131a4e0",
      },
    });

    const response = await GrabGlossProperties(
      "https://store.rerum.io/v1/id/614362c3e74876243131a4e0",
    );

    expect(axios.post).toHaveBeenCalledWith(
      "https://tinymatt.rerum.io/gloss/query?limit=100&skip=0",
      {
        $or: [
          { target: "http://store.rerum.io/v1/id/614362c3e74876243131a4e0" },
          { target: "https://store.rerum.io/v1/id/614362c3e74876243131a4e0" },
          {
            "target.@id":
              "http://store.rerum.io/v1/id/614362c3e74876243131a4e0",
          },
          {
            "target.@id":
              "https://store.rerum.io/v1/id/614362c3e74876243131a4e0",
          },
          {
            "target.id": "http://store.rerum.io/v1/id/614362c3e74876243131a4e0",
          },
          {
            "target.id":
              "https://store.rerum.io/v1/id/614362c3e74876243131a4e0",
          },
        ],
        "__rerum.history.next": { $exists: true, $size: 0 },
      },
      { headers: { "Content-Type": "application/json; charset=utf-8" } },
    );
  });
});

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
    ];
    const processedGloss = processGloss(mockGlossList, "https://example.com");

    expect(processedGloss).toEqual({
      targetId: "https://example.com",
      title: "Example title",
      targetCollection: "Example collection",
      targetChapter: "5",
      targetVerse: "1",
      tags: "Tag 1, Tag 2",
      textFormat: "text/html",
      textLanguage: "la",
      textValue: "Lorem ipsum dolor sit amet",
      creator: "https://example.com",
      document: "Example document",
      themes: ["Theme 1", "Theme 2"],
      canonicalReference: "Matthew 5:1",
      description: "Example description",
    });
  });

  it("should return default values for empty array input", () => {
    const emptyGlossList = [];
    const processedGloss = processGloss(emptyGlossList, "https://example.com");
    expect(processedGloss).toEqual({
      targetId: "https://example.com",
      title: "",
      targetCollection: "",
      targetChapter: "",
      targetVerse: "",
      tags: undefined,
      textFormat: undefined,
      textLanguage: undefined,
      textValue: undefined,
      creator: undefined,
      document: undefined,
      themes: undefined,
      canonicalReference: undefined,
      description: undefined,
    });
  });
});
