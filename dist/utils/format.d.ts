import { GoogleWebsiteRank } from "./google.js";
/**
 * Formats the rank of a keyword as a string.
 * @param keyword - The keyword string.
 * @param rank - The rank of the keyword.
 * @returns A formatted string. The rank will be displayed as a question mark if it is undefined.
 */
export declare function formatKeywordRank(keyword: string, rank?: GoogleWebsiteRank): string;
