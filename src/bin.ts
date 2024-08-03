#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";

import { ArgumentsParser, formatKeywordRank } from "./internal/index.js";
import { getWebsiteRank, WebsiteRank } from "./rank.js";

type RankPromise = Promise<WebsiteRank | undefined>;

const parser = new ArgumentsParser();
const args = await parser.parse();

const rankByKeywords: [string, RankPromise][] = [];
for (const keyword of args.keywords) {
  const prom = getWebsiteRank(args.website, keyword, {
    maxPage: args.maxPage,
  });
  rankByKeywords.push([keyword, prom]);
}

process.stdout.write(`Ranks for ${chalk.blueBright(args.website)} website:\n`);

const loading = ora("Getting ranks...");
loading.start();
for (const [keyword, prom] of rankByKeywords) {
  loading.text = `Getting ranks of ${chalk.blueBright(keyword)} keyword...`;
  const str = formatKeywordRank(keyword, await prom);
  process.stdout.write(`\r\x1b[K${str}\n`);
}
loading.stop();
