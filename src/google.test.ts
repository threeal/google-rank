import { describe, expect, it } from "@jest/globals";
import { getWebsiteRank } from "./google.mjs";

describe("rank a website in Google Search", () => {
  it("should rank a website that is found", async () => {
    const rank = await getWebsiteRank("github.com", "googlethis");
    expect(rank).toBeDefined();
    if (rank !== undefined) {
      expect(rank.page).toBe(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });

  it("should not rank a website that is not found", async () => {
    const rank = await getWebsiteRank("randomsite.con", "googlethis");
    expect(rank).toBeUndefined();
  });

  it("should rank a website that is found on a specific page", async () => {
    const rank = await getWebsiteRank("facebook.com", "googlethis", {
      maxPage: 10,
    });
    expect(rank).toBeDefined();
    if (rank !== undefined) {
      expect(rank.page).toBeGreaterThan(0);
      expect(rank.rank).toBeGreaterThanOrEqual(0);
    }
  });
});
