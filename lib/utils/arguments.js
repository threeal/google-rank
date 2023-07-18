"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramArguments = exports.setupProgramArguments = void 0;
const commander_1 = require("commander");
/**
 * Sets up the arguments and options available in the program.
 */
function setupProgramArguments() {
    commander_1.program
        .argument("<website>", "website name")
        .arguments("<keywords...>")
        .option("--file <string>", "read keywords from file instead")
        .option("--max-page <number>", "maximum page to search for", "3");
}
exports.setupProgramArguments = setupProgramArguments;
/**
 * Gets the arguments and options of the program.
 * @returns Arguments and options.
 */
function getProgramArguments() {
    const opts = commander_1.program.opts();
    return {
        website: commander_1.program.args[0],
        keywords: commander_1.program.args.slice(1),
        file: opts.file,
        maxPage: parseInt(opts.maxPage, 10),
    };
}
exports.getProgramArguments = getProgramArguments;
//# sourceMappingURL=arguments.js.map