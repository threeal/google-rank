import { beforeAll, describe, expect, it } from "@jest/globals";
import { program } from "commander";
import { getProgramArguments, setupProgramArguments } from "./arguments";

describe("parse program arguments and options", () => {
  beforeAll(() => setupProgramArguments());

  it("should parse arguments correctly", () => {
    program.parse(["node", "test", "github.com", "github", "googlethis"]);

    const args = getProgramArguments();
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github", "googlethis"]);
    expect(args.maxPage).toBe(3);
  });

  it("should parse arguments and options correctly", () => {
    program.parse(["node", "test", "github.com", "github", "--max-page", "7"]);

    const args = getProgramArguments();
    expect(args.website).toBe("github.com");
    expect(args.keywords).toStrictEqual(["github"]);
    expect(args.maxPage).toBe(7);
  });
});
