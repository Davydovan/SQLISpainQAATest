import { Page } from 'playwright-core';
import axios from 'axios';

/**
 * Generates a random integer between min (inclusive) and max (exclusive).
 * @param {number} max - The upper bound (exclusive).
 * @param {number} min - The lower bound (inclusive).
 * @returns {number} - A random integer between min and max.
 */
const rnd = (max, min) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Attempts to solve a CAPTCHA on a web page using audio recognition.
 * This function interacts with Google's reCAPTCHA by clicking the audio challenge
 * and sending the audio to a speech-to-text API for transcription.
 * @async
 * @param {Page} page - The Playwright page object representing the browser page.
 * @returns {Promise<boolean>} - A promise that resolves to true if the CAPTCHA is solved successfully, otherwise false.
 */
export async function solveCaptcha(page: Page) {
  // Locate the iframes for the reCAPTCHA widget
  const anchorIframe = page.frameLocator('iframe[src*="api2/anchor"]');
  const reCaptchaIframe = page.frameLocator('iframe[src*="api2/bframe"]');

  while (true) {
    // Click the reCAPTCHA checkbox
    await anchorIframe.locator('#recaptcha-anchor').click({ delay: rnd(150, 30) });
    // Click the audio challenge button
    await reCaptchaIframe.locator('#recaptcha-audio-button').click({ delay: rnd(150, 30) });

    // Get the audio source link
    const audioLink = reCaptchaIframe.locator('#audio-source');
    const audioCaptcha = await page.waitForResponse(await audioLink.getAttribute('src') || '');

    try {
      // Send the audio to the Wit.ai API for transcription
      const { data } = await axios.post(
        'https://api.wit.ai/speech?v=2021092',
        await audioCaptcha.body(),
        {
          headers: {
            Authorization: 'Bearer JVHWCNWJLWLGN6MFALYLHAPKUFHMNTAC',
            'Content-Type': 'audio/mpeg3',
          },
        }
      );

      // Extract the transcription from the API response
      const audioTranscript = data.match('"text": "(.*)",')[1].trim();

      // Fill in the transcription and verify the CAPTCHA
      await reCaptchaIframe.locator('#audio-response').fill(audioTranscript, { timeout: rnd(75, 30) });
      await reCaptchaIframe.locator('#recaptcha-verify-button').click({ delay: rnd(150, 30) });

      // Check for error messages indicating failure
      const errorMessage = reCaptchaIframe.getByText('Multiple correct solutions required - please solve more.');
      if (await errorMessage.isVisible()) {
        return false;
      }

      // Check if the main content is visible, indicating success
      const searchResults = page.getByRole('main');
      return await searchResults.isVisible();
    } catch (e) {
      console.error(e);
      // Reload the CAPTCHA if an error occurs
      await reCaptchaIframe.locator('#recaptcha-reload-button').click({ delay: rnd(150, 30) });
    }
  }
}