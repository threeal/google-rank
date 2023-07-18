import { beforeAll, describe, expect, it } from "@jest/globals";
import { program } from "commander";
import { setupProgramArguments } from "./arguments";

describe("setup program arguments and options", () => {
  beforeAll(() => setupProgramArguments());

  it("should parse arguments correctly", () => {
    program.parse(["node", "test", "github.com", "github", "googlethis"]);
    expect(program.args).toStrictEqual(["github.com", "github", "googlethis"]);
    expect(program.opts()).toStrictEqual({ maxPage: "3" });
  });

  it("should parse arguments and options correctly", () => {
    program.parse(["node", "test", "github.com", "github", "--max-page", "7"]);
    expect(program.args).toStrictEqual(["github.com", "github"]);
    expect(program.opts()).toStrictEqual({ maxPage: "7" });
  });
});
