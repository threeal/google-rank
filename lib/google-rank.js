#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const utils = __importStar(require("./utils"));
async function run() {
    commander_1.program
        .argument("<website>", "website name")
        .arguments("<keywords...>")
        .option("--max-page <number>", "maximum page to search for", "3")
        .parse();
    const website = commander_1.program.args[0];
    const keywords = commander_1.program.args.slice(1);
    const opts = commander_1.program.opts();
    const maxPage = Number.parseInt(opts.maxPage);
    const rankByKeywords = [];
    for (const keyword of keywords) {
        const prom = utils.googleGetWebsiteRank(website, keyword, { maxPage });
        rankByKeywords.push([keyword, prom]);
    }
    process.stdout.write(`Ranks for ${chalk_1.default.blueBright(website)} website:\n`);
    for (const [keyword, prom] of rankByKeywords) {
        const str = utils.formatKeywordRank(keyword, await prom);
        process.stdout.write(`${str}\n`);
    }
}
run();
//# sourceMappingURL=google-rank.js.map