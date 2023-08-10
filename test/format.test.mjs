import { expect } from "expect";
import chalk from "chalk";
import { formatKeywordRank } from "../dist/internal/format.mjs";

describe("format the rank of a keyword as a string", () => {
  it("should format undefined rank correctly", () => {
    const str = formatKeywordRank("a keyword", undefined);
    const mark = chalk.blackBright("?");
    expect(str).toBe(`page ${mark}  rank ${mark}  a keyword`);
  });

  it("should format green rank correctly", () => {
    const str = formatKeywordRank("a keyword", { page: 0, rank: 2 });
    expect(str).toBe(
      `page ${chalk.greenBright(1)}  rank ${chalk.greenBright(3)}  a keyword`,
    );
  });

  it("should format green page and red rank correctly", () => {
    const str = formatKeywordRank("a keyword", { page: 0, rank: 3 });
    expect(str).toBe(
      `page ${chalk.greenBright(1)}  rank ${chalk.redBright(4)}  a keyword`,
    );
  });

  it("should format red rank correctly", () => {
    const str = formatKeywordRank("a keyword", { page: 1, rank: 0 });
    expect(str).toBe(
      `page ${chalk.redBright(2)}  rank ${chalk.redBright(1)}  a keyword`,
    );
  });
});
