#!/usr/bin/env node

import { program } from "commander";
import { getWebsiteRank } from "./utils";

async function run() {
  program
    .argument("<website>", "website name")
    .arguments("<keywords...>")
    .parse();

  const website = program.args[0];
  const keywords = program.args.slice(1);

  const rankByKeywords: [string, Promise<number>][] = [];
  for (const keyword of keywords) {
    const prom = getWebsiteRank(website, keyword);
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
