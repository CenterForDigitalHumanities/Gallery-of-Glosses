import {
  grabProperties,
  getQueryFromId,
  makePagedQuery,
  filterDataAtTargets,
} from "../utils";
import axios from "axios";
import { TINY } from "@/configs/rerum-links";

jest.mock("axios");
describe("grabProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query", async () => {
    axios.post.mockResolvedValue({
      data: { status: 200, someProperty: "someValue" },
    });
    const response = await grabProperties(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${TINY}/query?limit=100&skip=0`,
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
    const response = await grabProperties(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );
    expect(response.status).toBe(200);
  });
});

describe("getQueryFromId", () => {
  it("should return a query object with the correct properties", () => {
    const query = getQueryFromId(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );
    expect(query).toEqual({
      $or: [
        { target: "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1" },
        { target: "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1" },
        {
          "target.@id": "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
        },
        {
          "target.@id": "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
        },
        {
          "target.id": "http://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
        },
        {
          "target.id": "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
        },
      ],
      "__rerum.history.next": { $exists: true, $size: 0 },
    });
  });
});

describe("makePagedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query with default limit and skip values", async () => {
    axios.post.mockResolvedValue({
      data: [{ status: 200, someProperty: "someValue" }],
    });

    const mockData = { example: "data" };

    const response = await makePagedQuery("https://example.com", mockData);

    expect(axios.post).toHaveBeenCalledWith(
      "https://example.com?limit=100&skip=0",
      mockData,
      { headers: { "Content-Type": "application/json; charset=utf-8" } },
    );
  });
});

describe("filterDataAtTargets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should filter through all data that matches the filter function", async () => {
    const mockData = [
      { target: "https://example.com" },
      { target: "https://example.com" },
      { target: "https://example.com" },
    ];
    axios.get.mockResolvedValue({ data: { "@type": "Text" } });
    const filteredData = await filterDataAtTargets(
      mockData,
      (item) => item["@type"] === "Text",
    );
    expect(filteredData).toEqual([
      { "@type": "Text" },
      { "@type": "Text" },
      { "@type": "Text" },
    ]);
  });

  it("should filter out all data that doesn't match the filter function", async () => {
    const mockData = [
      { target: "https://example.com" },
      { target: "https://example.com" },
      { target: "https://example.com" },
    ];
    axios.get.mockResolvedValue({ data: { "@type": "Text" } });
    const filteredData = await filterDataAtTargets(
      mockData,
      (item) => item["@type"] !== "Text",
    );
    expect(filteredData).toEqual([]);
  });
});
