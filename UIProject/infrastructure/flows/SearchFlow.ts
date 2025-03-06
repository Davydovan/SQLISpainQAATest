import { expect, Page } from "@playwright/test";
import { solveCaptcha } from '../helpers/SolveCaptchaHelper';
import { StringExtensions } from "../extensions/StringExtensions";

/**
 * Represents a set of flows for interacting with the search functionality.
 */
export class SearchFlow {
  /**
   * The Playwright Page object used for browser interactions.
   */
  page: Page;

  /**
   * Utility for string manipulations.
   */
  stringExtensions: StringExtensions;

  /**
   * Constructs a new instance of SearchFlow.
   * @param {Page} page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.stringExtensions = new StringExtensions();
  }

  /**
   * Performs a search by typing the search text and pressing enter.
   * @param {string} searchText - The text to search for.
   * @returns {Promise<void>}
   */
  async search(searchText: string): Promise<void> {
    await this.clickSearchField();
    await this.page.keyboard.type(searchText);
    await this.emulateScrollHumanInteraction();
    await this.pressEnter();
  }

  /**
   * Performs a search by emulating human typing interaction.
   * @param {string} searchText - The text to search for.
   * @returns {Promise<void>}
   */
  async searchEmulatingHumanInteraction(searchText: string): Promise<void> {
    await this.clickSearchField();
    for (const char of searchText) {
      await this.page.keyboard.press(char, { delay: Math.random() * 100 + 50 });
    }
    await this.emulateScrollHumanInteraction();
    await this.pressEnter();
  }

  /**
   * Emulates mouse movement to simulate human interaction.
   * @returns {Promise<void>}
   */
  async emulateMoveMouseHumanInteraction(): Promise<void> {
    await this.page.mouse.move(100, 100, { steps: 10 });
    await this.page.mouse.down();
    await this.page.mouse.move(200, 200, { steps: 20 });
    await this.page.mouse.up();
  }

  /**
   * Opens a Wikipedia page by searching for the given text.
   * @param {string} searchText - The text to search for.
   * @returns {Promise<void>}
   */
  async openWikiPageBySearch(searchText: string): Promise<void> {
    const searchTextWithFirstCapitalLetter = this.stringExtensions.capitalizeTheFirstLetter(searchText);
    const locator = this.page.locator(`//a[h3[text()="${searchTextWithFirstCapitalLetter}"] and .//span[text()="Wikipedia"]]`);
    await expect(locator).toBeVisible();
    await locator.click();
  }

  /**
   * Handles CAPTCHA if it appears during the search process.
   * @returns {Promise<void>}
   */
  async handleCaptcha(): Promise<void> {
    const captchaFrame = this.page.frameLocator('[title="reCAPTCHA"]').getByText("I'm not a robot");
    const isVisible = await captchaFrame.isVisible({timeout: 80000});
    if (isVisible) {
      await solveCaptcha(this.page);
    }

    const searchResults = this.page.getByRole('main');
    await expect(searchResults).toBeVisible();
  }

  /**
   * Clicks the search field to focus it.
   * @private
   * @returns {Promise<void>}
   */
  private async clickSearchField(): Promise<void> {
    const searchField = this.page.getByTitle('Buscar');
    await expect(searchField).toBeVisible();
    await searchField.click();
  }

  /**
   * Simulates pressing the Enter key.
   * @private
   * @returns {Promise<void>}
   */
  private async pressEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
    await this.page.waitForEvent('load');
  }
  
  /**
   * Emulates scrolling to simulate human interaction.
   * @returns {Promise<void>}
   */
  
  private async emulateScrollHumanInteraction(): Promise<void> {
    const scrollSteps = Math.floor(Math.random() * 5) + 5; // 5-10 steps
    const stepSize = 80 / scrollSteps;

    for (let i = 0; i < scrollSteps; i++) {
      await this.page.evaluate((y) => window.scrollBy(0, y), stepSize);
      await this.page.waitForTimeout(Math.random() * 300 + 100); // Random delay between 100-400ms
    }
  }
}