import { program } from "commander";

/**
 * Sets up the arguments and options available in the program.
 */
export function setupProgramArguments(): void {
  program
    .argument("<website>", "website name")
    .arguments("<keywords...>")
    .option("--max-page <number>", "maximum page to search for", "3");
}
