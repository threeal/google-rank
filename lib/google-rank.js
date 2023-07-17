#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const utils_1 = require("./utils");
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
        const prom = (0, utils_1.googleGetWebsiteRank)(website, keyword, { maxPage });
        rankByKeywords.push([keyword, prom]);
    }
    process.stdout.write(`Ranks for ${chalk_1.default.blueBright(website)} website:\n`);
    for (const [keyword, prom] of rankByKeywords) {
        const rank = await prom;
        if (rank === undefined) {
            process.stdout.write(`page ?  rank ?`);
        }
        else {
            if (rank.page <= 0) {
                process.stdout.write(`page ${chalk_1.default.greenBright(rank.page + 1)}`);
            }
            else {
                process.stdout.write(`page ${chalk_1.default.redBright(rank.page + 1)}`);
            }
            if (rank.page <= 0 && rank.rank <= 2) {
                process.stdout.write(`  rank ${chalk_1.default.greenBright(rank.rank + 1)}`);
            }
            else {
                process.stdout.write(`  rank ${chalk_1.default.redBright(rank.rank + 1)}`);
            }
        }
        process.stdout.write(`  ${keyword}\n`);
    }
}
run();
//# sourceMappingURL=google-rank.js.map