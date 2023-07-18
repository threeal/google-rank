import { beforeAll, describe, expect, it } from "@jest/globals";
import { program } from "commander";
import { getProgramArguments, setupProgramArguments } from "./arguments";

describe("parse program arguments and options", () => {
  beforeAll(() => setupProgramArguments());

  it("should parse arguments correctly", () => {
    const cmd = "node test github.com github googlethis";
    program.parse(cmd.split(" "));

    const args = getProgramArguments();
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github", "googlethis"]);
    expect(args.file).toBeUndefined();
    expect(args.maxPage).toBe(3);
  });

  it("should parse arguments and options correctly", () => {
    const cmd = "node test github.com github --file keywords.txt --max-page 7";
    program.parse(cmd.split(" "));

    const args = getProgramArguments();
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github"]);
    expect(args.file).toBe("keywords.txt");
    expect(args.maxPage).toBe(7);
  });
});
