"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatKeywordRank = void 0;
const chalk_1 = __importDefault(require("chalk"));
/**
 * Formats the rank of a keyword as a string.
 * @param keyword - The keyword string.
 * @param rank - The rank of the keyword.
 * @returns A formatted string. The rank will be displayed as a question mark if it is undefined.
 */
function formatKeywordRank(keyword, rank) {
    if (rank === undefined)
        return `page ?  rank ?  ${keyword}`;
    const pageStr = rank.page <= 0
        ? `page ${chalk_1.default.greenBright(rank.page + 1)}`
        : `page ${chalk_1.default.redBright(rank.page + 1)}`;
    const rankStr = rank.page <= 0 && rank.rank <= 2
        ? `rank ${chalk_1.default.greenBright(rank.rank + 1)}`
        : `rank ${chalk_1.default.redBright(rank.rank + 1)}`;
    return `${pageStr}  ${rankStr}  ${keyword}`;
}
exports.formatKeywordRank = formatKeywordRank;
//# sourceMappingURL=format.js.map