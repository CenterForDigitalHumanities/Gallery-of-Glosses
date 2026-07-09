import {
  grabProperties,
  getQueryFromId,
  makePagedQuery,
} from "../utils";
import { TINY, GENERATOR } from "@/configs/rerum-links";

// Mock global fetch for Node.js test environment
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("grabProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query", async () => {
    const mockResponse = {
      ok: true,
      json: async () => [{ status: 200, someProperty: "someValue" }],
    };
    mockFetch.mockResolvedValue(mockResponse);

    const response = await grabProperties(
      "https://store.rerum.io/v1/id/65837315d08cc4cd9d2aaeb1",
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${TINY}/query?limit=100&skip=0`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
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
          "__rerum.generatedBy": GENERATOR,
        }),
      }),
    );
  });

  it("should return a response with a status of 200 for a valid query", async () => {
    const mockResponse = {
      ok: true,
      json: async () => [{ status: 200, someProperty: "someValue" }],
    };
    mockFetch.mockResolvedValue(mockResponse);

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
      "__rerum.generatedBy": GENERATOR,
    });
  });
});

describe("makePagedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an appropriate RERUM query with default limit and skip values", async () => {
    const mockResponse = {
      ok: true,
      json: async () => [{ status: 200, someProperty: "someValue" }],
    };
    mockFetch.mockResolvedValue(mockResponse);

    const mockData = { example: "data" };

    const response = await makePagedQuery("https://example.com", mockData);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://example.com?limit=100&skip=0",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(mockData),
      }),
    );
  });
});
