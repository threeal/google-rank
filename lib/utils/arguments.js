"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramArguments = exports.setupProgramArguments = void 0;
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
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
 * Reads keywords from the specified file.
 * @param filename - The file to read keywords from.
 * @returns A promise that resolves to a list of keywords.
 */
async function readKeywordsFromFile(filename) {
    const file = fs.createReadStream(filename);
    const read = readline.createInterface({ input: file });
    const keywords = [];
    for await (const line of read) {
        keywords.push(line.trim());
    }
    return keywords;
}
/**
 * Gets the arguments and options of the program.
 * @returns A promise that resolves to the arguments and options.
 */
async function getProgramArguments() {
    const opts = commander_1.program.opts();
    let keywords = commander_1.program.args.slice(1);
    if (opts.file !== undefined) {
        keywords = keywords.concat(await readKeywordsFromFile(opts.file));
    }
    return {
        website: commander_1.program.args[0],
        maxPage: parseInt(opts.maxPage, 10),
        keywords,
    };
}
exports.getProgramArguments = getProgramArguments;
//# sourceMappingURL=arguments.js.map