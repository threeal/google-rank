import esmock from "esmock";
import path from "path";
import { Readable } from "stream";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

describe("parse program arguments and options", () => {
  const mockImport = () =>
    esmock("../dist/internal/arguments.mjs", {
      [require.resolve("fs").replaceAll(path.sep, "/")]: {
        createReadStream: () =>
          Readable.from(["googlethis\n\n\ngooglethat\n", "googlethis github"]),
      },
    });

  it("should parse nothing", async () => {
    const { ArgumentsParser } = await mockImport();

    const parser = new ArgumentsParser();
    const cmd = "node test github.com";

    const prom = parser.parse(cmd.split(" "));
    return prom.should.eventually.to.be.deep.equal({
      website: "github.com",
      keywords: ["github.com"],
      maxPage: 3,
    });
  });

  it("should parse keywords correctly", async () => {
    const { ArgumentsParser } = await mockImport();

    const parser = new ArgumentsParser();
    const cmd = "node test github.com --keywords github gihtub";

    const prom = parser.parse(cmd.split(" "));
    return prom.should.eventually.to.be.deep.equal({
      website: "github.com",
      keywords: ["github", "gihtub"],
      maxPage: 3,
    });
  });

  it("should parse file correctly", async () => {
    const { ArgumentsParser } = await mockImport();

    const parser = new ArgumentsParser();
    const cmd = "node test github.com --file keywords.txt";

    const prom = parser.parse(cmd.split(" "));
    return prom.should.eventually.to.be.deep.equal({
      website: "github.com",
      keywords: ["googlethis", "googlethat", "googlethis github"],
      maxPage: 3,
    });
  });

  it("should parse arguments and options correctly", async () => {
    const { ArgumentsParser } = await mockImport();

    const parser = new ArgumentsParser();
    const cmd =
      "node test github.com --keywords github gihtub --file keywords.txt --max-page 7";

    const prom = parser.parse(cmd.split(" "));
    return prom.should.eventually.to.be.deep.equal({
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
