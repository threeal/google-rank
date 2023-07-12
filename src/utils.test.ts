import { expect, it } from "@jest/globals";
import { listWebsites } from "./utils";

it("should list websites", async () => {
  const websites = await listWebsites("google");
  expect(websites.length).toBeGreaterThan(0);
  expect(websites[0]).toBe("www.google.com");
});
