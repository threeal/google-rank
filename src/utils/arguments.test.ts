import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { program } from "commander";
import { Readable } from "stream";
import { getProgramArguments, setupProgramArguments } from "./arguments";

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  createReadStream: () => {
    return Readable.from(["googlethis\ngooglethat\n", "googlethis github"]);
  },
}));

describe("parse program arguments and options", () => {
  beforeAll(() => setupProgramArguments());

  it("should parse arguments correctly", async () => {
    const cmd = "node test github.com github googlethis";
    program.parse(cmd.split(" "));

    const args = await getProgramArguments();
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github", "googlethis"]);
    expect(args.maxPage).toBe(3);
  });

  it("should parse arguments and options correctly", async () => {
    const cmd = "node test github.com github --file keywords.txt --max-page 7";
    program.parse(cmd.split(" "));

    const args = await getProgramArguments();
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
