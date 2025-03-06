/**
 * A class for formatting strings.
 */
export class StringExtensions {
    /**
     * Capitalizes the first letter of a string.
     * @param {string} string - The string to capitalize.
     * @returns {string} The string with the first letter capitalized.
     */
    public capitalizeTheFirstLetter(string: string): string {
      const corrected = string.charAt(0).toUpperCase() + string.slice(1);
      return corrected;
    }
  }
  