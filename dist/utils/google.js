"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleGetWebsiteRank = exports.googleListWebsites = void 0;
const googlethis_1 = __importDefault(require("googlethis"));
/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to an array of website URLs.
 */
async function googleListWebsites(keyword, opts) {
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
exports.googleListWebsites = googleListWebsites;
/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website. Returns `undefined` if the website is not found in the search results.
 */
async function googleGetWebsiteRank(website, keyword, opts) {
    const maxPage = opts?.maxPage ?? 1;
    for (let page = 0; page < maxPage; ++page) {
        const websites = await googleListWebsites(keyword, { page });
        for (let rank = 0; rank < websites.length; ++rank) {
            if (websites[rank].includes(website)) {
                return { page, rank };
            }
        }
    }
    return undefined;
}
exports.googleGetWebsiteRank = googleGetWebsiteRank;
//# sourceMappingURL=google.js.map