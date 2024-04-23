import { nvdaTest as test } from "@guidepup/playwright";
import { nvda } from "@guidepup/guidepup";
import { expect } from "@playwright/test";


test.describe("Playwright NVDA", () => {
  test("I can navigate the Guidepup Github page with NVDA", async ({
    page,
    nvda,
  }) => {
    // Navigate to Guidepup GitHub page
    await page.goto("https://github.com/guidepup/guidepup", {
      waitUntil: "load",
    });

    // Wait for page to be ready and setup
    const header = page.locator('header[role="banner"]');
    await header.waitFor();

    // Interact with the page
    await nvda.navigateToWebContent();

    // Move across the page menu to the Guidepup heading using NVDA
    while (
      !(await nvda.lastSpokenPhrase()).includes("Folders and files, heading, level 2")
    ) {
      await nvda.perform(nvda.keyboardCommands.moveToNextHeading);
    }

    // Assert that the spoken phrases are as expected
    expect(JSON.stringify(await nvda.spokenPhraseLog())).toMatchSnapshot();
  });
});