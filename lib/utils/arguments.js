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
exports.ArgumentsParser = void 0;
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
/**
 * Represents the arguments and options parser of the program.
 */
class ArgumentsParser {
    #program;
    /**
     * Constructs a new instance of the arguments and options parser of the program.
     */
    constructor() {
        this.#program = new commander_1.Command();
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
    async parse(argv) {
        this.#program.parse(argv);
        const opts = this.#program.opts();
        const args = {
            website: this.#program.args[0],
            keywords: opts.keywords ?? [],
            maxPage: parseInt(opts.maxPage, 10),
        };
        // Parse additional keywords from the given file, if specified.
        if (opts.file !== undefined) {
            const keywords = await readKeywordsFromFile(opts.file);
            args.keywords = args.keywords.concat(keywords);
        }
        // If no keywords are provided, use the website as the keyword.
        if (args.keywords.length < 1) {
            args.keywords = [args.website];
        }
        return args;
    }
}
exports.ArgumentsParser = ArgumentsParser;
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
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0)
            keywords.push(trimmedLine);
    }
    return keywords;
}
//# sourceMappingURL=arguments.js.map