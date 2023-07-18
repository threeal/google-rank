#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import * as fs from "fs";
import ora from "ora";
import * as readline from "readline";
import * as utils from "./utils";

type RankPromise = Promise<utils.GoogleWebsiteRank | undefined>;

async function run() {
  utils.setupProgramArguments();
  program.parse();

  const args = utils.getProgramArguments();

  const keywords = args.keywords;
  if (args.file !== undefined) {
    const file = fs.createReadStream(args.file);
    const read = readline.createInterface({ input: file });
    for await (const line of read) {
      keywords.push(line.trim());
    }
  }

  const rankByKeywords: [string, RankPromise][] = [];
  for (const keyword of args.keywords) {
    const prom = utils.googleGetWebsiteRank(args.website, keyword, {
      maxPage: args.maxPage,
    });
    rankByKeywords.push([keyword, prom]);
  }

  process.stdout.write(
    `Ranks for ${chalk.blueBright(args.website)} website:\n`
  );

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
