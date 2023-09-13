import { search, ResultTypes } from "google-sr";
/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword - The keyword to search for.
 * @param page - The page number to list the website.
 * @returns A promise that resolves to an array of website URLs.
 */
async function listWebsites(keyword, page) {
    const res = await search({ query: keyword, page: page });
    const websites = [];
    let prevWebsite = "";
    for (const result of res) {
        if (result.type != ResultTypes.SearchResult)
            continue;
        const website = new URL(result.link).hostname;
        if (website !== prevWebsite)
            websites.push(website);
        prevWebsite = website;
    }
    return websites;
}
/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website. Returns `undefined` if the website is not found in the search results.
 */
export async function getWebsiteRank(website, keyword, opts) {
    const maxPage = opts?.maxPage ?? 1;
    for (let page = 0; page < maxPage; ++page) {
        const websites = await listWebsites(keyword, page);
        for (let rank = 0; rank < websites.length; ++rank) {
            if (websites[rank].includes(website)) {
                return { page, rank };
            }
        }
    }
    return undefined;
}
//# sourceMappingURL=rank.mjs.map