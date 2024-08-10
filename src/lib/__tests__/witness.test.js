import {
  processWitness,
  grabWitnessFragments,
  grabWitnessFromFragment,
} from "../utils";
import axios from "axios";
import { TINY } from "@/configs/rerum-links";

jest.mock("axios");

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

describe("grabWitnessFragments", () => {
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
    const response = await grabWitnessFragments(targetId);

    expect(axios.post).toHaveBeenCalledWith(
      `${TINY}/query?limit=100&skip=0`,
      {
        "body.identifier.value": targetId,
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
    const response = await grabWitnessFragments(targetId);

    expect(axios.get).toHaveBeenCalledWith("example1");
  });
});

describe("grabWitnessFromFragment", () => {
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
    const response = await grabWitnessFromFragment(targetId);

    expect(axios.post).toHaveBeenCalledWith(
      `${TINY}/query?limit=100&skip=0`,
      {
        "body.identifier.value": targetId,
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
    const response = await grabWitnessFromFragment(targetId);

    expect(axios.get).toHaveBeenCalledWith("example1");
  });
});
