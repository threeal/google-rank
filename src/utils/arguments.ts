import { program } from "commander";

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

  /** File to read keywords from. */
  file?: string;

  /** Maximum page to search for. */
  maxPage: number;
}

/**
 * Gets the arguments and options of the program.
 * @returns Arguments and options.
 */
export function getProgramArguments(): ProgramArguments {
  const opts = program.opts();
  return {
    website: program.args[0],
    keywords: program.args.slice(1),
    file: opts.file,
    maxPage: parseInt(opts.maxPage, 10),
  };
}
