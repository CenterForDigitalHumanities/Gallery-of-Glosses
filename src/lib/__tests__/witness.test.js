import { processWitness } from "../utils";

describe("processWitness", () => {
  it("should return an object with the correct properties", () => {
    const mockWitnessList = [
      { provenance: { value: "Example provenance" } },
      { url: { value: "https://example.com" } },
      { identifier: { value: "Example identifier" } },
      { city: { value: "Paris" } },
      { alternative: { value: "Example alternative" } },
      { Repository: { value: "Example repository" } },
      { title: { value: "Example title" } },
      { institution: { value: "Example institution" } },
      { "tpen://base-project": { value: "Example base project" } },
      { region: { value: "Example region" } },
    ];
    const processedWitness = processWitness(
      mockWitnessList,
      "https://example.com",
    );

    expect(processedWitness).toEqual({
      targetId: "https://example.com",
      provenance: "Example provenance",
      url: "https://example.com",
      identifier: "Example identifier",
      city: "Paris",
      alternative: "Example alternative",
      repository: "Example repository",
      title: "Example title",
      institution: "Example institution",
      baseProject: "Example base project",
      region: "Example region",
    });
  });

  it("should return default values for empty array input", () => {
    const emptyWitnessList = [];
    const processedWitness = processWitness(
      emptyWitnessList,
      "https://example.com",
    );
    expect(processedWitness).toEqual({
      targetId: "https://example.com",
      provenance: undefined,
      url: undefined,
      identifier: undefined,
      city: undefined,
      alternative: undefined,
      repository: undefined,
      title: undefined,
      institution: undefined,
      baseProject: undefined,
      region: undefined,
    });
  });
});
