#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import ora from "ora";
import * as utils from "./utils";

type RankPromise = Promise<utils.GoogleWebsiteRank | undefined>;

async function run() {
  utils.setupProgramArguments();
  program.parse();

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

  const loading = ora("Getting ranks...");
  loading.start();
  for (const [keyword, prom] of rankByKeywords) {
    loading.text = `Getting ranks of ${chalk.blueBright(keyword)} keyword...`;
    const str = utils.formatKeywordRank(keyword, await prom);
    process.stdout.write(`\r\x1b[K${str}\n`);
  }
  loading.stop();
}

run();
