#!/usr/bin/env node

import chalk from "chalk";
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

  process.stdout.write(`Ranks for ${chalk.blueBright(website)} website:\n`);
  for (const [keyword, prom] of rankByKeywords) {
    const rank = await prom;
    if (rank === undefined) {
      process.stdout.write(`page ?  rank ?`);
    } else {
      if (rank.page <= 0) {
        process.stdout.write(`page ${chalk.greenBright(rank.page + 1)}`);
      } else {
        process.stdout.write(`page ${chalk.redBright(rank.page + 1)}`);
      }

      if (rank.page <= 0 && rank.rank <= 2) {
        process.stdout.write(`  rank ${chalk.greenBright(rank.rank + 1)}`);
      } else {
        process.stdout.write(`  rank ${chalk.redBright(rank.rank + 1)}`);
      }
    }
    process.stdout.write(`  ${keyword}\n`);
  }
}

run();
