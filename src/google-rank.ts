#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import * as utils from "./utils";

type RankPromise = Promise<utils.GoogleWebsiteRank | undefined>;

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

  const rankByKeywords: [string, RankPromise][] = [];
  for (const keyword of keywords) {
    const prom = utils.googleGetWebsiteRank(website, keyword, { maxPage });
    rankByKeywords.push([keyword, prom]);
  }

  process.stdout.write(`Ranks for ${chalk.blueBright(website)} website:\n`);
  for (const [keyword, prom] of rankByKeywords) {
    const str = utils.formatKeywordRank(keyword, await prom);
    process.stdout.write(`${str}\n`);
  }
}

run();
