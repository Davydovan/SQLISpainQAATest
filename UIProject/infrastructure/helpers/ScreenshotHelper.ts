import * as path from "path";
import * as fs from "fs";
import { Page } from "@playwright/test";

/**
 * A helper class for taking screenshots with Playwright.
 */
export class ScreenshotHelper {
  page: Page;

  /**
   * Constructs a new ScreenshotHelper instance.
   * @param {Page} page - The Playwright Page object to interact with.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Takes a screenshot of the current page and saves it to the specified directory.
   * If the directory does not exist, it will be created.
   * 
   * @param {string} screenshotDir - The directory where the screenshot will be saved.
   * @returns {Promise<void>} - A promise that resolves when the screenshot is taken.
   */
  async screenshot(screenshotDir: string): Promise<void> {
    // Check if the screenshot directory exists, and create it if it doesn't
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Generate a unique filename using the current timestamp
    const prefix = new Date().getTime().toString();
    const suggestedFilename = `${prefix}_wikipedia_automation.png`;

    // Create the full file path for the screenshot
    const filePath = path.join(screenshotDir, suggestedFilename);

    // Take a full-page screenshot and save it to the specified path
    await this.page.screenshot({ path: filePath});
  }
}