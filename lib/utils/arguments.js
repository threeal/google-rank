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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArgumentsParser_program;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentsParser = void 0;
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
/**
 * Represents the arguments and options parser of the program.
 */
class ArgumentsParser {
    /**
     * Constructs a new instance of the arguments and options parser of the program.
     */
    constructor() {
        _ArgumentsParser_program.set(this, void 0);
        __classPrivateFieldSet(this, _ArgumentsParser_program, new commander_1.Command(), "f");
        // Sets up the arguments and options available in the program
        __classPrivateFieldGet(this, _ArgumentsParser_program, "f")
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
        __classPrivateFieldGet(this, _ArgumentsParser_program, "f").parse(argv);
        const opts = __classPrivateFieldGet(this, _ArgumentsParser_program, "f").opts();
        let keywords = opts.keywords ?? [];
        if (opts.file !== undefined) {
            keywords = keywords.concat(await readKeywordsFromFile(opts.file));
        }
        return {
            website: __classPrivateFieldGet(this, _ArgumentsParser_program, "f").args[0],
            maxPage: parseInt(opts.maxPage, 10),
            keywords,
        };
    }
}
exports.ArgumentsParser = ArgumentsParser;
_ArgumentsParser_program = new WeakMap();
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