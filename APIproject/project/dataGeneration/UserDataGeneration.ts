import { UserDataModel } from "../dataModels/UserDataModel";
import { faker } from "@faker-js/faker";

/**
 * Generates a random user data object.
 *
 * @returns {UserDataModel} A new instance of UserDataModel populated with random data.
 */
export function generateData(): UserDataModel {
  const data = new UserDataModel(
    faker.number.int(), // Random integer for user ID
    faker.person.middleName(), // Random middle name
    faker.person.firstName(), // Random first name
    faker.person.lastName(), // Random last name
    faker.internet.email(), // Random email address
    faker.internet.password(), // Random password
    faker.phone.number({ style: 'international' }), // Random phone number in international format
    faker.number.int({ max: 3 }) // Random integer with a maximum value of 3
  );
  return data;
}