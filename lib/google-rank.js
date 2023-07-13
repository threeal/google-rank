#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const utils_1 = require("./utils");
async function run() {
    commander_1.program
        .argument("<website>", "website name")
        .arguments("<keywords...>")
        .parse();
    const website = commander_1.program.args[0];
    const keywords = commander_1.program.args.slice(1);
    const rankByKeywords = [];
    for (const keyword of keywords) {
        const prom = (0, utils_1.getWebsiteRank)(website, keyword);
        rankByKeywords.push([keyword, prom]);
    }
    process.stdout.write(`Ranks for ${website} website:\n`);
    for (const [keyword, prom] of rankByKeywords) {
        const rank = await prom;
        const rankStr = rank > 0 ? `${rank}` : "?";
        process.stdout.write(`${rankStr} ${keyword}\n`);
    }
}
run();
//# sourceMappingURL=google-rank.js.map