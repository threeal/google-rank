import { describe, expect, it } from "@jest/globals";
import { getWebsiteRank, listWebsites } from "./google";

describe("list websites", () => {
  it("should list websites", async () => {
    const websites = await listWebsites("googlethis");
    expect(websites.length).toBeGreaterThan(0);
    expect(websites[0]).toBe("www.npmjs.com");
  });

  it("should list websites on specific page", async () => {
    const websites = await listWebsites("googlethis", { page: 1 });
    expect(websites.length).toBeGreaterThan(0);
    expect(websites).not.toContain("www.npmjs.com");
  });
});

describe("rank a website", () => {
  it("should rank a website that is found", async () => {
    const rank = await getWebsiteRank("github.com", "googlethis");
    expect(rank).not.toBeUndefined();
    if (rank !== undefined) {
      expect(rank.page).toBe(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });

  it("should not rank a website that is not found", async () => {
    const rank = await getWebsiteRank("randomsite.con", "googlethis");
    expect(rank).toBeUndefined();
  });

  it("should rank a website that is found on specific page", async () => {
    const rank = await getWebsiteRank("facebook.com", "googlethis", {
      maxPage: 3,
    });
    expect(rank).not.toBeUndefined();
    if (rank !== undefined) {
      expect(rank.page).toBeGreaterThan(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });
});
