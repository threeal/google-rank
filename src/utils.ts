import google from "googlethis";

/**
 * Retrieves a list of websites from Google search results based on the provided keyword.
 * @param keyword The keyword to search for.
 * @returns A promise that resolves to an array of website URLs.
 */
export async function listWebsites(keyword: string): Promise<string[]> {
  const res = await google.search(keyword, { parse_ads: false });
  const websites: string[] = [];
  let prevWebsite = "";
  for (const result of res.results) {
    const website = new URL(result.url).hostname;
    if (website !== prevWebsite) websites.push(website);
    prevWebsite = website;
  }
  return websites;
}
