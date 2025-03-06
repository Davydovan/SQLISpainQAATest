import { test, expect } from '@playwright/test';
import { UserTasks } from "../project/tasks/UserTask";
import { generateData } from "../project/dataGeneration/UserDataGeneration";
import { PetTasks } from '../project/tasks/PetTask';
import { PetNameCounter } from '../project/helpers/PetNameCounter';
import { Status } from '../project/enums/Status';
import { generatePetTuples, PetDataModel } from '../project/dataModels/PetDataModel';

test.describe('User Tests - https://petstore.swagger.io/', () => {
  test('Check created User', async ({ request }) => {
    const userTask = new UserTasks(request);
    const userData = generateData();

    await test.step(`Create user with data = ${userData.serialize()}`, async () => {
      await userTask.createUser(userData);
    });

    await test.step(`Verify user data from API call by username = '${userData.username}' matches generated data`, async () => {
      const actualData = await userTask.getUser(userData.username);
      expect(actualData, `User data for ${userData.username} does not match expected data.`).toEqual(userData);
    });
  });
});

test.describe('Pet Tests - https://petstore.swagger.io/', () => {
  test('Get names of the pets that have been sold', async ({ request }) => {
    const petTask = new PetTasks(request);
    const status = Status.Sold;

    await test.step(`Get pets by status = '${status}'`, async () => {
      const actualData = await petTask.getPetsByStatus(status);
      const petTuples = generatePetTuples(actualData);
      console.log(`${status} pets:`, petTuples);
    });
  });

  const statuses = [Status.Sold, Status.Available, Status.Pending];
  statuses.forEach((status) => {
    test(`Identify how many pets share the same name with status = '${status}'`, async ({ request }) => {
      const petTask = new PetTasks(request);
      let petsData: PetDataModel[] = [];

      await test.step(`Get pets by status = '${status}'`, async () => {
        petsData = await petTask.getPetsByStatus(status);
      });

      await test.step('Get how many pets share the same name', async () => {
        const petNameCounter = new PetNameCounter(petsData);
        const nameCounts = petNameCounter.countPetNames();
        const patNames = petNameCounter.countAndFilterPetNames();
        console.log(`${status} pets names and count:`, nameCounts);
        console.log(`${status} pets names and count with the same name more than one:`, patNames);
      });
    });
  });
});