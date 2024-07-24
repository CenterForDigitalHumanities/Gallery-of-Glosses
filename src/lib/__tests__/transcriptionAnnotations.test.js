import {
  grabGlossWitnessFragments,
  grabTranscriptionAnnotations,
  processTranscriptionAnnotations,
} from "../utils";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("grabGlossWitnessFragments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a response with a status of 200 for a valid query", async () => {
    axios.post.mockResolvedValue({
      data: { status: 200, someProperty: "someValue" },
    });
    const response = await grabTranscriptionAnnotations(
      "https://store.rerum.io/v1/id/654e522f1521f1b32513839b",
    );
    expect(response.status).toBe(200);
  });
});

describe("grabTranscriptionAnnotations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query", async () => {
    axios.post.mockResolvedValue({
      data: { status: 200, someProperty: "someValue" },
    });
    const response = await grabTranscriptionAnnotations(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );

    expect(axios.post).toHaveBeenCalledWith(
      "https://tiny.rerum.io/query?limit=100&skip=0",
      {
        $or: [
          { target: "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1" },
          { target: "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1" },
          {
            "target.@id":
              "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
          },
          {
            "target.@id":
              "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
          },
          {
            "target.id": "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
          },
          {
            "target.id":
              "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
          },
        ],
        "__rerum.history.next": { $exists: true, $size: 0 },
      },
      { headers: { "Content-Type": "application/json; charset=utf-8" } },
    );
  });

  it("should return a response with a status of 200 for a valid query", async () => {
    axios.post.mockResolvedValue({
      data: { status: 200, someProperty: "someValue" },
    });
    const response = await grabTranscriptionAnnotations(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );
    expect(response.status).toBe(200);
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
