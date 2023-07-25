import { Command } from "commander";
import * as fs from "fs";
import * as readline from "readline";

/**
 * Represents the arguments and options of the program.
 */
export interface Arguments {
  /** Website name. */
  website: string;

  /** Keywords to search for. */
  keywords: string[];

  /** Maximum page to search for. */
  maxPage: number;
}

/**
 * Represents the arguments and options parser of the program.
 */
export class ArgumentsParser {
  #program: Command;

  /**
   * Constructs a new instance of the arguments and options parser of the program.
   */
  constructor() {
    this.#program = new Command();

    // Sets up the arguments and options available in the program
    this.#program
      .argument("<website>", "website name")
      .option("--keywords <string...>", "keywords to search for")
      .option("--file <string>", "file to read keywords from")
      .option("--max-page <number>", "maximum page to search for", "3");
  }

  /**
   * Parses the arguments and options of the program.
   * @param argv - An optional array of strings representing the command-line arguments.
   * @returns A promise that resolves to the arguments and options.
   */
  async parse(argv?: readonly string[]): Promise<Arguments> {
    this.#program.parse(argv);
    const opts = this.#program.opts();

    let keywords = opts.keywords;
    if (opts.file !== undefined) {
      keywords = keywords.concat(await readKeywordsFromFile(opts.file));
    }

    return {
      website: this.#program.args[0],
      maxPage: parseInt(opts.maxPage, 10),
      keywords,
    };
  }
}

/**
 * Reads keywords from the specified file.
 * @param filename - The file to read keywords from.
 * @returns A promise that resolves to a list of keywords.
 */
async function readKeywordsFromFile(filename: string): Promise<string[]> {
  const file = fs.createReadStream(filename);
  const read = readline.createInterface({ input: file });

  const keywords: string[] = [];
  for await (const line of read) {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 0) keywords.push(trimmedLine);
  }
  return keywords;
}
