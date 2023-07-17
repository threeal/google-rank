import google from "googlethis";

/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to an array of website URLs.
 */
export async function listWebsites(
  keyword: string,
  opts?: { page?: number }
): Promise<string[]> {
  const res = await google.search(keyword, {
    page: opts?.page ?? 0,
    parse_ads: false,
  });
  const websites: string[] = [];
  let prevWebsite = "";
  for (const result of res.results) {
    const website = new URL(result.url).hostname;
    if (website !== prevWebsite) websites.push(website);
    prevWebsite = website;
  }
  return websites;
}

/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website (1-based index). Returns 0 if the website is not found in the search results.
 */
export async function getWebsiteRank(
  website: string,
  keyword: string,
  opts?: { maxPage?: number }
): Promise<number> {
  const maxPage = opts?.maxPage ?? 1;
  for (let page = 0; page < maxPage; ++page) {
    const websites = await listWebsites(keyword, { page });
    for (let i = 0; i < websites.length; ++i) {
      if (websites[i].includes(website)) return i + 1;
    }
  }
  return 0;
}
