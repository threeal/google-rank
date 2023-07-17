/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to an array of website URLs.
 */
export declare function listWebsites(keyword: string, opts?: {
    page?: number;
}): Promise<string[]>;
/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website (1-based index). Returns 0 if the website is not found in the search results.
 */
export declare function getWebsiteRank(website: string, keyword: string, opts?: {
    maxPage?: number;
}): Promise<number>;
