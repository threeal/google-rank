"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupProgramArguments = void 0;
const commander_1 = require("commander");
/**
 * Sets up the arguments and options available in the program.
 */
function setupProgramArguments() {
    commander_1.program
        .argument("<website>", "website name")
        .arguments("<keywords...>")
        .option("--max-page <number>", "maximum page to search for", "3");
}
exports.setupProgramArguments = setupProgramArguments;
//# sourceMappingURL=arguments.js.map