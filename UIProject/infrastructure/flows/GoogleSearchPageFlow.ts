import { Page } from "@playwright/test";
import { CookiesPopupFlow } from './CookiesPopupFlow';

/**
 * Class representing the flow for interacting with the Google Search page.
 */
export class GoogleSearchPageFlow {
  page: Page;
  cookiesPopupFlow: CookiesPopupFlow;

  /**
   * Creates an instance of GoogleSearchPageFlow.
   * @param {Page} page - The Playwright page object representing the browser page.
   */
  constructor(page: Page) {
    this.page = page;
    // Initialize the CookiesPopupFlow to handle cookie popups
    this.cookiesPopupFlow = new CookiesPopupFlow(page);
  }

  /**
   * Navigates to the Google Search page and accepts cookies if prompted.
   * @async
   * @returns {Promise<void>} - A promise that resolves when the navigation and cookie acceptance are complete.
   */
  async goToGoogleSearchPage() {
    // Navigate to the Google homepage
    await this.page.goto('/');
    
    // Use the CookiesPopupFlow to accept cookies if the popup appears
    await this.cookiesPopupFlow.acceptCookies();
  }
}