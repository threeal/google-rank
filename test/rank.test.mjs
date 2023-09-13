import esmock from "esmock";

describe("rank a website in Google Search", function () {
  const mockImport = () =>
    esmock("../dist/rank.mjs", {
      ["google-sr"]: {
        searchWithPages: async ({ query, pages }) => {
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
      },
    });

  it("should rank a website that is found", async () => {
    const { getWebsiteRank } = await mockImport();
    const prom = getWebsiteRank("google.com", "google");
    return prom.should.eventually.not.to.be.undefined.and.then(
      ({ page, rank }) => {
        page.should.be.equal(0);
        rank.should.be.at.least(0);
      },
    );
  });

  it("should not rank a website that is not found", async () => {
    const { getWebsiteRank } = await mockImport();
    const prom = getWebsiteRank("randomsite.con", "google");
    return prom.should.eventually.to.be.undefined;
  });

  it("should rank a website that is found on a specific page", async () => {
    const { getWebsiteRank } = await mockImport();
    const prom = getWebsiteRank("facebook.com", "google", { maxPage: 3 });
    return prom.should.eventually.not.to.be.undefined.and.then(
      ({ page, rank }) => {
        page.should.be.above(0);
        rank.should.be.at.least(0);
      },
    );
  });
});
