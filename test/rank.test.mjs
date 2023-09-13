import { getWebsiteRank } from "../dist/rank.mjs";

describe("rank a website in Google Search", function () {
  this.retries(3);
  this.timeout(20000);

  it("should rank a website that is found", async () => {
    const prom = getWebsiteRank("google.com", "google");
    return prom.should.eventually.not.to.be.undefined.and.then(
      ({ page, rank }) => {
        page.should.be.equal(0);
        rank.should.be.at.least(0);
      },
    );
  });

  it("should not rank a website that is not found", async () => {
    const prom = getWebsiteRank("randomsite.con", "google");
    return prom.should.eventually.to.be.undefined;
  });

  it("should rank a website that is found on a specific page", async () => {
    const prom = getWebsiteRank("facebook.com", "google", { maxPage: 3 });
    return prom.should.eventually.not.to.be.undefined.and.then(
      ({ page, rank }) => {
        page.should.be.above(0);
        rank.should.be.at.least(0);
      },
    );
  });
});
