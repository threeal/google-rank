import { Readable } from "node:stream";
import { describe, expect, it, vi } from "vitest";

vi.mock("fs", () => ({
  createReadStream: () =>
    Readable.from(["googlethis\n\n\ngooglethat\n", "googlethis github"]),
}));

describe("parse program arguments and options", () => {
  it("should parse nothing", async () => {
    const { ArgumentsParser } = await import("./arguments.js");
    const parser = new ArgumentsParser();
    const cmd = "node test github.com";

    const prom = parser.parse(cmd.split(" "));
    return expect(prom).resolves.toStrictEqual({
      website: "github.com",
      keywords: ["github.com"],
      maxPage: 3,
    });
  });

  it("should parse keywords correctly", async () => {
    const { ArgumentsParser } = await import("./arguments.js");
    const parser = new ArgumentsParser();
    const cmd = "node test github.com --keywords github gihtub";

    const prom = parser.parse(cmd.split(" "));
    return expect(prom).resolves.toStrictEqual({
      website: "github.com",
      keywords: ["github", "gihtub"],
      maxPage: 3,
    });
  });

  it("should parse file correctly", async () => {
    const { ArgumentsParser } = await import("./arguments.js");
    const parser = new ArgumentsParser();
    const cmd = "node test github.com --file keywords.txt";

    const prom = parser.parse(cmd.split(" "));
    return expect(prom).resolves.toStrictEqual({
      website: "github.com",
      keywords: ["googlethis", "googlethat", "googlethis github"],
      maxPage: 3,
    });
  });

  it("should parse arguments and options correctly", async () => {
    const { ArgumentsParser } = await import("./arguments.js");
    const parser = new ArgumentsParser();
    const cmd =
      "node test github.com --keywords github gihtub --file keywords.txt --max-page 7";

    const prom = parser.parse(cmd.split(" "));
    return expect(prom).resolves.toStrictEqual({
      website: "github.com",
      keywords: [
        "github",
        "gihtub",
        "googlethis",
        "googlethat",
        "googlethis github",
      ],
      maxPage: 7,
    });
  });
});
