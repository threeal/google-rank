/**
 * Represents the ranking of a website in Google Search.
 */
export interface WebsiteRank {
    /** The search page ranking of the website. */
    page: number;
    /** The ranking of the website on the specified page. */
    rank: number;
}
/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website. Returns `undefined` if the website is not found in the search results.
 */
export declare function getWebsiteRank(website: string, keyword: string, opts?: {
    maxPage?: number;
}): Promise<WebsiteRank | undefined>;
