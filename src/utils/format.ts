import chalk from "chalk";
import { GoogleWebsiteRank } from "./google";

/**
 * Formats the rank of a keyword as a string.
 * @param keyword - The keyword string.
 * @param rank - The rank of the keyword.
 * @returns A formatted string. The rank will be displayed as a question mark if it is undefined.
 */
export function formatKeywordRank(
  keyword: string,
  rank?: GoogleWebsiteRank
): string {
  if (rank === undefined) return `page ?  rank ?  ${keyword}`;

  const pageStr =
    rank.page <= 0
      ? `page ${chalk.greenBright(rank.page + 1)}`
      : `page ${chalk.redBright(rank.page + 1)}`;

  const rankStr =
    rank.page <= 0 && rank.rank <= 2
      ? `rank ${chalk.greenBright(rank.rank + 1)}`
      : `rank ${chalk.redBright(rank.rank + 1)}`;

  return `${pageStr}  ${rankStr}  ${keyword}`;
}
