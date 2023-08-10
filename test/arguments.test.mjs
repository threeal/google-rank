import { expect } from "expect";
// import { Readable } from "stream";
import { ArgumentsParser } from "../dist/internal/arguments.mjs";

// jest.mock("fs", () => ({
//   ...jest.requireActual<object>("fs"),
//   createReadStream: () => {
//     return Readable.from(["googlethis\n\n\ngooglethat\n", "googlethis github"]);
//   },
// }));

describe("parse program arguments and options", () => {
  it("should parse nothing", async () => {
    const parser = new ArgumentsParser();
    const cmd = "node test github.com";
    const args = await parser.parse(cmd.split(" "));
    expect(args).toStrictEqual({
      website: "github.com",
      keywords: ["github.com"],
      maxPage: 3,
    });
  });

  it("should parse keywords correctly", async () => {
    const parser = new ArgumentsParser();
    const cmd = "node test github.com --keywords github gihtub";
    const args = await parser.parse(cmd.split(" "));
    expect(args).toStrictEqual({
      website: "github.com",
      keywords: ["github", "gihtub"],
      maxPage: 3,
    });
  });

  it("should parse file correctly", async () => {
    const parser = new ArgumentsParser();
    const cmd = "node test github.com --file keywords.txt";
    const args = await parser.parse(cmd.split(" "));
    expect(args).toStrictEqual({
      website: "github.com",
      keywords: ["googlethis", "googlethat", "googlethis github"],
      maxPage: 3,
    });
  });

  it("should parse arguments and options correctly", async () => {
    const parser = new ArgumentsParser();
    const cmd =
      "node test github.com --keywords github gihtub --file keywords.txt --max-page 7";
    const args = await parser.parse(cmd.split(" "));
    expect(args).toStrictEqual({
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
