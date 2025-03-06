import { APIRequestContext, expect } from "@playwright/test";
import { PetDataModel } from "../dataModels/PetDataModel";
import { CategoryDataModel } from "../dataModels/CategoryDataModel";
import { TagDataModel } from "../dataModels/TagDataModel";

/**
 * A class to perform tasks related to pet data using an API.
 */
export class PetTasks {
  apiRequest: APIRequestContext;

  /**
   * Creates an instance of PetTasks.
   * @param {APIRequestContext} apiRequest - The API request context for making HTTP requests.
   */
  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
  }

  
  // baseURL: 'https://petstore.swagger.io/v2/',
  // extraHTTPHeaders: {
  //    "Content-Type": "application/json",
  //     "accept": "application/json"

  /**
   * Retrieves pets by their status from the API.
   * @param {string} status - The status of the pets to retrieve (e.g., "available", "pending", "sold").
   * @returns {Promise<PetDataModel[]>} A promise that resolves to an array of PetDataModel instances.
   */
  async getPetsByStatus(status: string): Promise<PetDataModel[]> {
    const response = await this.apiRequest.get(`https://petstore.swagger.io/v2/pet/findByStatus`, {headers:{
      "Content-Type": "application/json",
      "accept": "application/json"
    }, params: { status: status } });
    expect(response.status()).toBe(200);
    const json = await response.json();
    return this.fromJsonToArray(json);
  }

  /**
   * Converts a JSON object to an array of PetDataModel instances.
   * @private
   * @param {JSON} json - The JSON object to convert.
   * @returns {PetDataModel[]} An array of PetDataModel instances.
   */
  private fromJsonToArray(json: JSON): PetDataModel[] {
    const data = json as any;
    const pets: PetDataModel[] = data.map((item: any) => {
      let category: CategoryDataModel | undefined;
      if (item.category !== undefined) {
        category = new CategoryDataModel(item.category.id, item.category.name);
      }
      const tags = item.tags.map((tag: any) => new TagDataModel(tag.id, tag.name));

      return new PetDataModel(
        item.id,
        category,
        item.name,
        item.photoUrls,
        tags,
        item.status
      );
    });
    return pets;
  }
}