import { program } from "commander";
import { getWebsiteRank } from "./utils";

async function run() {
  program
    .argument("<website>", "website name")
    .arguments("<keywords...>")
    .parse();

  const website = program.args[0];
  const keywords = program.args.slice(1);

  process.stdout.write(`Ranks for ${website} website:\n`);
  for (const keyword of keywords) {
    const rank = await getWebsiteRank(website, keyword);
    const rankStr = rank > 0 ? `${rank}` : "?";
    process.stdout.write(`${rankStr} ${keyword}\n`);
  }
}

run();
