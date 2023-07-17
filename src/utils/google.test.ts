import { describe, expect, it } from "@jest/globals";
import { googleGetWebsiteRank, googleListWebsites } from "./google";

describe("list websites in Google Search", () => {
  it("should list websites", async () => {
    const websites = await googleListWebsites("googlethis");
    expect(websites.length).toBeGreaterThan(0);
    expect(websites[0]).toBe("www.npmjs.com");
  });

  it("should list websites on a specific page", async () => {
    const websites = await googleListWebsites("googlethis", { page: 1 });
    expect(websites.length).toBeGreaterThan(0);
    expect(websites).not.toContain("www.npmjs.com");
  });
});

describe("rank a website in Google Search", () => {
  it("should rank a website that is found", async () => {
    const rank = await googleGetWebsiteRank("github.com", "googlethis");
    expect(rank).toBeDefined();
    if (rank) {
      expect(rank.page).toBe(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });

  it("should not rank a website that is not found", async () => {
    const rank = await googleGetWebsiteRank("randomsite.con", "googlethis");
    expect(rank).toBeUndefined();
  });

  it("should rank a website that is found on a specific page", async () => {
    const rank = await googleGetWebsiteRank("facebook.com", "googlethis", {
      maxPage: 3,
    });
    expect(rank).toBeDefined();
    if (rank) {
      expect(rank.page).toBeGreaterThan(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });
});
