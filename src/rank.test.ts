import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("google-sr", () => ({
  ...jest.requireActual<object>("google-sr"),
  searchWithPages: async ({
    query,
    pages,
  }: {
    query: string;
    pages: number;
  }) => {
    if (query !== "google") return [];
    const websitesPages = [
      [
        "https://www.google.com/?hl=id",
        "https://www.google.co.id/?hl=id",
        "https://accounts.google.com/login?hl=id",
        "https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=en_US",
        "https://myaccount.google.com/privacy?hl=id",
        "https://accounts.google.com/",
        "https://myaccount.google.com/intro/personal-info?hl=id",
        "https://id.wikipedia.org/wiki/Google",
      ],
      [
        null,
        "https://twitter.com/Google",
        "https://accounts.google.com/",
        "https://www.youtube.com/user/google",
        "https://www.instagram.com/googleindonesia/",
        "https://news.google.com/?hl=ID",
        "https://about.google/",
        "https://blog.google/",
        "https://store.google.com/",
        "https://support.google.com/",
      ],
      [
        "https://www.facebook.com/Google/?locale=id_ID",
        "https://www.facebook.com/Google/?locale=id_ID",
        "https://io.google/",
        "https://www.google.co.uk/",
        "https://myactivity.google.com/",
        "https://apps.google.com/meet/",
        "https://one.google.com/about",
        "https://bard.google.com/?hl=in",
        "https://ads.google.com/intl/id_id/home/",
        "https://classroom.google.com/",
      ],
    ];
    return websitesPages.slice(0, pages).map((websites) => {
      return websites.map((website) => ({
        type: "SEARCH",
        link: website,
      }));
    });
  },
}));

describe("rank a website in Google Search", function () {
  it("should rank a website that is found", async () => {
    const { getWebsiteRank } = await import("./rank.js");
    const res = await getWebsiteRank("google.com", "google");
    expect(res).not.toBeUndefined();
    if (res !== undefined) {
      expect(res.page).toBe(0);
      expect(res.rank).toBeGreaterThanOrEqual(0);
    }
  });

  it("should not rank a website that is not found", async () => {
    const { getWebsiteRank } = await import("./rank.js");
    const prom = getWebsiteRank("randomsite.con", "google");
    return expect(prom).resolves.toBeUndefined();
  });

  it("should rank a website that is found on a specific page", async () => {
    const { getWebsiteRank } = await import("./rank.js");
    const res = await getWebsiteRank("facebook.com", "google", {
      maxPage: 3,
    });
    expect(res).not.toBeUndefined();
    if (res !== undefined) {
      expect(res.page).toBeGreaterThan(0);
      expect(res.rank).toBeGreaterThanOrEqual(0);
    }
  });
});
