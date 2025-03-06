import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { UserDataModel } from "../dataModels/UserDataModel";

/**
 * A class to perform tasks related to user data using an API.
 */
export class UserTasks {
  apiRequest: APIRequestContext;

  /**
   * Creates an instance of UserTasks.
   * @param {APIRequestContext} apiRequest - The API request context for making HTTP requests.
   */
  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
  }

  /**
   * Creates a new user using the provided user data.
   * @param {UserDataModel} data - The user data to create a new user.
   * @returns {Promise<void>} A promise that resolves when the user is successfully created.
   */
  async createUser(data: UserDataModel): Promise<void> {
    const userData = data.serialize();

    const response = await this.apiRequest.post("https://petstore.swagger.io/v2/user", {headers:{
      "Content-Type": "application/json",
      "accept": "application/json"
    },
      data: userData
    });

    expect(response.status()).toBe(200);
  }

  /**
   * Retrieves a user by their username.
   * @param {string} userName - The username of the user to retrieve.
   * @returns {Promise<UserDataModel>} A promise that resolves to a UserDataModel instance representing the user.
   */
  async getUser(userName: string): Promise<UserDataModel> {
    let response: APIResponse = await this.apiRequest.get(`https://petstore.swagger.io/v2/user/${userName}`, {headers:{
      "Content-Type": "application/json",
      "accept": "application/json"
    }});

    await expect(async () => {
      response = await this.apiRequest.get(`./user/${userName}`);

      expect(response.status()).toBe(200);
    }).toPass({
      timeout: 10000,
      intervals: [1_000, 5_000],
    });

    const json = await response.json();
    const jsonString = JSON.stringify(json);
    const userData = UserDataModel.deserialize(jsonString);
    return userData;
  }
}