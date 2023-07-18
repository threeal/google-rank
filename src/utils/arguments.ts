import { program } from "commander";
import * as fs from "fs";
import * as readline from "readline";

/**
 * Sets up the arguments and options available in the program.
 */
export function setupProgramArguments(): void {
  program
    .argument("<website>", "website name")
    .arguments("<keywords...>")
    .option("--file <string>", "read keywords from file instead")
    .option("--max-page <number>", "maximum page to search for", "3");
}

/**
 * Represents the arguments and options of the program.
 */
export interface ProgramArguments {
  /** Website name. */
  website: string;

  /** Keywords to search for. */
  keywords: string[];

  /** Maximum page to search for. */
  maxPage: number;
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
    keywords.push(line.trim());
  }
  return keywords;
}

/**
 * Gets the arguments and options of the program.
 * @returns A promise that resolves to the arguments and options.
 */
export async function getProgramArguments(): Promise<ProgramArguments> {
  const opts = program.opts();

  let keywords = program.args.slice(1);
  if (opts.file !== undefined) {
    keywords = keywords.concat(await readKeywordsFromFile(opts.file));
  }

  return {
    website: program.args[0],
    maxPage: parseInt(opts.maxPage, 10),
    keywords,
  };
}
