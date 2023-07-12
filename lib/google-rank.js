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
    process.stdout.write(`Ranks for ${website} website:\n`);
    for (const keyword of keywords) {
        const rank = await (0, utils_1.getWebsiteRank)(website, keyword);
        const rankStr = rank > 0 ? `${rank}` : "?";
        process.stdout.write(`${rankStr} ${keyword}\n`);
    }
}
run();
//# sourceMappingURL=google-rank.js.map