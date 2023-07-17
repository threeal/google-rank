#!/usr/bin/env node

import { program } from "commander";
import { getWebsiteRank, WebsiteRank } from "./utils";

async function run() {
  program
    .argument("<website>", "website name")
    .arguments("<keywords...>")
    .option("--max-page <number>", "maximum page to search for", "3")
    .parse();

  const website = program.args[0];
  const keywords = program.args.slice(1);

  const opts = program.opts();
  const maxPage = Number.parseInt(opts.maxPage);

  const rankByKeywords: [string, Promise<WebsiteRank | undefined>][] = [];
  for (const keyword of keywords) {
    const prom = getWebsiteRank(website, keyword, { maxPage });
    rankByKeywords.push([keyword, prom]);
  }

  process.stdout.write(`Ranks for ${website} website:\n`);
  for (const [keyword, prom] of rankByKeywords) {
    const rank = await prom;
    if (rank === undefined) {
      process.stdout.write(`page ?  rank ?`);
    } else {
      process.stdout.write(`page ${rank.page + 1}  rank ${rank.rank + 1}`);
    }
    process.stdout.write(`  ${keyword}\n`);
  }
}

run();
