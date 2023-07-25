import { describe, expect, it, jest } from "@jest/globals";
import { Readable } from "stream";
import { ArgumentsParser } from "./arguments";

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  createReadStream: () => {
    return Readable.from(["googlethis\n\n\ngooglethat\n", "googlethis github"]);
  },
}));

describe("parse program arguments and options", () => {
  it("should parse arguments correctly", async () => {
    const parser = new ArgumentsParser();
    const cmd = "node test github.com --keywords github googlethis";
    const args = await parser.parse(cmd.split(" "));
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github", "googlethis"]);
    expect(args.maxPage).toBe(3);
  });

  it("should parse arguments and options correctly", async () => {
    const parser = new ArgumentsParser();
    const cmd =
      "node test github.com --keywords github --file keywords.txt --max-page 7";

    const args = await parser.parse(cmd.split(" "));
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual([
      "github",
      "googlethis",
      "googlethat",
      "googlethis github",
    ]);
    expect(args.maxPage).toBe(7);
  });
});
