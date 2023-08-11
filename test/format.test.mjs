import chalk from "chalk";
import { formatKeywordRank } from "../dist/internal/format.mjs";

describe("format the rank of a keyword as a string", () => {
  it("should format undefined rank correctly", () => {
    const mark = chalk.blackBright("?");
    formatKeywordRank("a keyword", undefined).should.be.equal(
      `page ${mark}  rank ${mark}  a keyword`,
    );
  });

  it("should format green rank correctly", () => {
    formatKeywordRank("a keyword", { page: 0, rank: 2 }).should.be.equal(
      `page ${chalk.greenBright(1)}  rank ${chalk.greenBright(3)}  a keyword`,
    );
  });

  it("should format green page and red rank correctly", () => {
    formatKeywordRank("a keyword", { page: 0, rank: 3 }).should.be.equal(
      `page ${chalk.greenBright(1)}  rank ${chalk.redBright(4)}  a keyword`,
    );
  });

  it("should format red rank correctly", () => {
    formatKeywordRank("a keyword", { page: 1, rank: 0 }).should.be.equal(
      `page ${chalk.redBright(2)}  rank ${chalk.redBright(1)}  a keyword`,
    );
  });
});
