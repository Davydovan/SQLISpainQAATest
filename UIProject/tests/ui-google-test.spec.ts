import { test, expect } from '@playwright/test';
import { Page } from 'playwright-core';
import { SearchFlow } from '../infrastructure/flows/SearchFlow';
import { WikiPageFlow } from '../infrastructure/flows/WikiPageFlow';
import { GoogleSearchPageFlow } from '../infrastructure/flows/GoogleSearchPageFlow';
import { ScreenshotHelper } from '../infrastructure/helpers/ScreenshotHelper';
import * as path from "path";

// Declare variables for the page and flows
let page: Page;
let searchFlow: SearchFlow;
let wikiPageFlow: WikiPageFlow;
let googleSearchPage: GoogleSearchPageFlow;
let screenshotHelper: ScreenshotHelper;

// Define the directory for storing screenshots
const screenshotDir = path.resolve(__dirname, "screenshot");

  /**
   * Setup function to run before each test.
   * Opens a new browser context and navigates to Google.
   */
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    googleSearchPage = new GoogleSearchPageFlow(page);

    // Navigate to the Google search page
    await test.step('Go to Google search page', async () => {
      await googleSearchPage.goToGoogleSearchPage();
    });
  });

  /**
   * Teardown function to run after each test.
   * Closes the browser context.
   */
  test.afterEach(async () => {
    // Close the context instead of the entire browser
    await page.context().close();
  });


test.describe('UI Google Test Second Iteration', () => {
  /**
   * Test to find the Wikipedia page for 'automation' using Google search.
   * Emulates human-like interactions and verifies the search results.
   */
  test('Find Wikipedia page by searching for "automation"', async () => {
    test.slow(); // Mark the test as slow if necessary

    // Initialize flows and helpers
    searchFlow = new SearchFlow(page);
    wikiPageFlow = new WikiPageFlow(page);
    screenshotHelper = new ScreenshotHelper(page);

    const searchText = 'automation';

    await test.step(`Search for '${searchText}'`, async () => {
      await searchFlow.searchEmulatingHumanInteraction(searchText);
    });

    await test.step('Solve a CAPTCHA on a web page', async () => {
      await searchFlow.handleCaptcha();
    });

    await test.step('Find and open Wikipedia page', async () => {
      await searchFlow.openWikiPageBySearch(searchText);
    });

    await test.step('Check the year in which the first automated process was done', async () => {
      const isContains = await wikiPageFlow.checkIfContainsExpectedResult(['first', 'automated', 'process'], '1785');
      expect.soft(isContains).toBe(true);
    });

    await test.step('Take a screenshot of the Wikipedia page', async () => {
      await screenshotHelper.screenshot(screenshotDir);
    });
  });
});


test.describe.skip('UI Google Test First Iteration', () => {
  /**
  * Test to emulate human-like interactions and verify the search results.
  */
  test('Emulating Human-like Interactions', async () => {
    test.slow(); // Mark the test as slow if necessary
    // Initialize flows and helpers
    searchFlow = new SearchFlow(page);
    wikiPageFlow = new WikiPageFlow(page);
    screenshotHelper = new ScreenshotHelper(page);
  
    const searchText = 'automation';
  
    await test.step('Emulate move mouse human interaction', async () => {
      await searchFlow.emulateMoveMouseHumanInteraction();
    });
  
    await test.step(`Search for '${searchText}'`, async () => {
      await searchFlow.searchEmulatingHumanInteraction(searchText);
    });
  
    await test.step('Solve a CAPTCHA on a web page', async () => {
      await searchFlow.handleCaptcha();
    });
  
    await test.step("Find and open Wiki page", async () => {
      await searchFlow.openWikiPageBySearch(searchText);
    });
  
    await test.step('Check the year in which the first automated process was done', async () => {
      const isContains = await wikiPageFlow.checkIfContainsExpectedResult(['first', 'automated', 'process'], '1785');
      expect.soft(isContains).toBe(true);
    });
  
    await test.step('Take a screenshot of the Wikipedia page', async () => {
      await screenshotHelper.screenshot(screenshotDir);
    });
  }); 
});