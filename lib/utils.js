"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listWebsites = void 0;
const googlethis_1 = __importDefault(require("googlethis"));
/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword The keyword to search for.
 * @returns A promise that resolves to an array of website URLs.
 */
async function listWebsites(keyword) {
    const res = await googlethis_1.default.search(keyword, { parse_ads: false });
    const websites = [];
    let prevWebsite = "";
    for (const result of res.results) {
        const website = new URL(result.url).hostname;
        if (website !== prevWebsite)
            websites.push(website);
        prevWebsite = website;
    }
    return websites;
}
exports.listWebsites = listWebsites;
//# sourceMappingURL=utils.js.map