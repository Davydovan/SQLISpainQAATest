import { Page } from "@playwright/test";

/**
 * Class representing the flow to handle cookies popups on a webpage.
 */
export class CookiesPopupFlow {
  page: Page;

  /**
   * Creates an instance of CookiesPopupFlow.
   * @param {Page} page - The Playwright page object representing the browser page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Accepts cookies if the cookies popup is visible.
   * This method looks for a button with the label 'Aceptar todo' and clicks it if visible.
   * @async
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async acceptCookies() {
    // Locate the accept cookies button by its role and name
    const acceptButton = this.page.getByRole('button', { name: 'Aceptar todo' });

    // Check if the accept button is visible and click it if so
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  }
}