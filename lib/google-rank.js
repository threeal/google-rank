#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    process.stdout.write(`Ranks for ${website} website:\n`);
    for (const [keyword, prom] of rankByKeywords) {
        const rank = await prom;
        if (rank === undefined) {
            process.stdout.write(`page ?  rank ?`);
        }
        else {
            process.stdout.write(`page ${rank.page + 1}  rank ${rank.rank + 1}`);
        }
        process.stdout.write(`  ${keyword}\n`);
    }
}
run();
//# sourceMappingURL=google-rank.js.map