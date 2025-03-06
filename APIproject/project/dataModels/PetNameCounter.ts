import { PetDataModel } from "./PetDataModel";

/**
 * A class to count and filter pet names based on their occurrences.
 */
export class PetNameCounter {
  private pets: PetDataModel[];

  /**
   * Creates an instance of PetNameCounter.
   * @param {PetDataModel[]} pets - An array of pet data models.
   */
  constructor(pets: PetDataModel[]) {
    this.pets = pets;
  }

  /**
   * Counts the occurrences of each pet name.
   * @returns {Record<string, number>} An object where keys are pet names and values are their counts.
   */
  countPetNames(): Record<string, number> {
    const nameCount: Record<string, number> = {};

    for (const pet of this.pets) {
      if (nameCount[pet.name]) {
        nameCount[pet.name]++;
      } else {
        nameCount[pet.name] = 1;
      }
    }

    return nameCount;
  }

  /**
   * Counts the occurrences of each pet name and filters out names with a count of 1.
   * @returns {Record<string, number>} An object where keys are pet names with more than one occurrence and values are their counts.
   */
  countAndFilterPetNames(): Record<string, number> {
    const nameCount: Record<string, number> = {};

    // Count the occurrences of each pet name
    for (const pet of this.pets) {
      if (nameCount[pet.name]) {
        nameCount[pet.name]++;
      } else {
        nameCount[pet.name] = 1;
      }
    }

    // Filter out names with a count of 1
    return Object.fromEntries(
      Object.entries(nameCount).filter(([name, count]) => count > 1)
    );
  }
}