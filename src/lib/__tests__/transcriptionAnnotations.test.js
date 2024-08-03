import {
  grabGlossWitnessFragments,
  processTranscriptionAnnotations,
} from "../utils";
import axios from "axios";
import { TINY } from "@/configs/rerum-links";

jest.mock("axios");

describe("grabGlossWitnessFragments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send appropriate POST query", async () => {
    axios.post.mockResolvedValue({
      data: [{ target: "example1" }, { target: "example2" }],
    });
    axios.get.mockResolvedValue({
      data: { status: 200, "@type": "Text" },
    });

    let targetId = "https://store.rerum.io/v1/id/654e522f1521f1b32513839b";
    const response = await grabGlossWitnessFragments(targetId);

    expect(axios.post).toHaveBeenCalledWith(
      `${TINY}/query?limit=100&skip=0`,
      {
        "body.references.value": targetId,
        "__rerum.history.next": {
          $exists: true,
          $type: "array",
          $eq: [],
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  });

  it("should send appropriate GET", async () => {
    axios.post.mockResolvedValue({
      data: [{ target: "example1" }, { target: "example2" }],
    });
    axios.get.mockResolvedValue({
      data: { status: 200, "@type": "Text" },
    });

    let targetId = "https://store.rerum.io/v1/id/654e522f1521f1b32513839b";
    const response = await grabGlossWitnessFragments(targetId);

    expect(axios.get).toHaveBeenCalledWith("example1");
  });
});

describe("processTranscriptionAnnotations", () => {
  it("should return an object with the correct properties", () => {
    const mockAnnotationsList = [
      { title: { value: "Example title" } },
      { identifier: { value: "Example identifier" } },
      { creator: { value: "https://example.com" } },
      { source: { value: ["Source 1", "Source 2"] } },
      { selections: { value: ["Selection 1", "Selection 2"] } },
      { references: { value: ["Reference 1", "Reference 2"] } },
      {
        text: {
          format: "text/html",
          language: "la",
          textValue: "Lorem ipsum dolor sit amet",
        },
      },
    ];
    const processedAnnotations = processTranscriptionAnnotations(
      mockAnnotationsList,
      "https://example.com",
    );

    expect(processedAnnotations).toEqual({
      targetId: "https://example.com",
      title: "Example title",
      identifier: "Example identifier",
      creator: "https://example.com",
      source: ["Source 1", "Source 2"],
      selections: ["Selection 1", "Selection 2"],
      references: ["Reference 1", "Reference 2"],
      textFormat: "text/html",
      textLanguage: "la",
      textValue: "Lorem ipsum dolor sit amet",
    });
  });

  it("should return default values for empty array input", () => {
    const emptyAnnotationsList = [];
    const processedAnnotations = processTranscriptionAnnotations(
      emptyAnnotationsList,
      "https://example.com",
    );
    expect(processedAnnotations).toEqual({
      targetId: "https://example.com",
      title: undefined,
      identifier: undefined,
      creator: undefined,
      source: undefined,
      selections: undefined,
      references: undefined,
      textFormat: undefined,
      textLanguage: undefined,
      textValue: undefined,
    });
  });
});
