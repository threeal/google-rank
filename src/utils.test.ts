import { describe, expect, it } from "@jest/globals";
import { getWebsiteRank, listWebsites } from "./utils";

it("should list websites", async () => {
  const websites = await listWebsites("googlethis");
  expect(websites.length).toBeGreaterThan(0);
  expect(websites[0]).toBe("www.npmjs.com");
});

describe("rank a website", () => {
  it("should rank a found website", async () => {
    const rank = await getWebsiteRank("github.com", "googlethis");
    expect(rank).toBeGreaterThan(0);
  });

  it("should not rank a website that is not found", async () => {
    const rank = await getWebsiteRank("randomsite.con", "googlethis");
    expect(rank).toBe(0);
  });
});
