"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsiteRank = exports.listWebsites = void 0;
const googlethis_1 = __importDefault(require("googlethis"));
/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to an array of website URLs.
 */
async function listWebsites(keyword, opts) {
    const res = await googlethis_1.default.search(keyword, {
        page: opts?.page ?? 0,
        parse_ads: false,
    });
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
/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website (1-based index). Returns 0 if the website is not found in the search results.
 */
async function getWebsiteRank(website, keyword, opts) {
    const maxPage = opts?.maxPage ?? 1;
    for (let page = 0; page < maxPage; ++page) {
        const websites = await listWebsites(keyword, { page });
        for (let i = 0; i < websites.length; ++i) {
            if (websites[i].includes(website))
                return i + 1;
        }
    }
    return 0;
}
exports.getWebsiteRank = getWebsiteRank;
//# sourceMappingURL=utils.js.map