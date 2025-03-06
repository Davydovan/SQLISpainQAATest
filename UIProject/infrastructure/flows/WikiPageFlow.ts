import { expect, Page } from "@playwright/test";

/**
 * Class representing the flow for interacting with a Wikipedia page.
 */
export class WikiPageFlow {
  page: Page;

  /**
   * Creates an instance of WikiPageFlow.
   * @param {Page} page - The Playwright page object representing the browser page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Retrieves text content from the Wikipedia page.
   * Specifically, it extracts text from paragraphs within the '#mw-content-text' section.
   * @async
   * @returns {Promise<string[]>} - A promise that resolves to an array of strings, each representing a paragraph's text.
   */
  async getTextFromPage() {
    // Locate the content section of the Wikipedia page
    const wikiContentPage = this.page.$$('#mw-content-text');
    expect(wikiContentPage).toBeDefined(); // Ensure the content section is defined

    let text: string[] = [];
    // Iterate over each content element and extract text from paragraphs
    for (const content of await wikiContentPage) {
      text = await content.$$eval('p', (paragraphElements) =>
        paragraphElements.map((p) => p.textContent?.trim() || '')
      );
    }
    return text;
  }

  /**
   * Checks if the page contains paragraphs with all words from searchText and the expectedText.
   * @async
   * @param {string[]} searchText - An array of strings to search for in each paragraph.
   * @param {string} expectedText - A string that should be present in at least one of the filtered paragraphs.
   * @returns {Promise<boolean>} - A promise that resolves to true if the expectedText is found in any of the paragraphs containing all searchText words, otherwise false.
   */
  async checkIfContainsExpectedResult(searchText: string[], expectedText: string) {
    const cells = await this.getTextFromPage();

    // Filter paragraphs to include only those that contain all words in searchText
    const filteredCells = cells.filter(cell =>
      searchText.every(word => cell.includes(word))
    );

    // Check if any of the filtered paragraphs contain the expectedText
    const result = filteredCells.some(str => str.includes(expectedText));

    return result;
  }
}