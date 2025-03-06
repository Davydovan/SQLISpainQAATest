import { test, expect } from '@playwright/test';
import { UserTasks } from "../project/tasks/UserTask";
import { generateData } from "../project/dataGeneration/UserDataGeneration";
import { PetTasks } from '../project/tasks/PetTask';
import { PetNameCounter } from '../project/dataModels/PetNameCounter';
import { Status } from '../project/enums/Status';
import { generatePetTuples, PetDataModel } from '../project/dataModels/PetDataModel';

test('Check created User', {
  tag: '@user',
}, async ({ request }) => {
  const userTask = new UserTasks(request);
  const userData = generateData();

  await test.step(`Create user with data = ${userData.serialize()}`, async () => {
    await userTask.createUser(userData);
  });
  
  await test.step(`Verify user data from API call by user name = '${userData.username}' equal to generated data`, async () => {
    const actualData = await userTask.getUser(userData.username);
    await expect(actualData).toEqual(userData);
  }); 
});


test('Get names of the pets that have been sold',  {
  tag: '@pets',
}, async ({ request }) => {
  const userTask = new PetTasks(request);
  const status = Status.Sold;

  await test.step(`Get pets by status = '${status}'`, async () => {
    const actualData = await userTask.getPetsByStatus(status);
    const petTuples = generatePetTuples(actualData);
    console.log(`${status} pets:`, petTuples);
  });
});


[
  { status:  Status.Sold},
  { status:  Status.Available},
  { status:  Status.Pending},
].forEach(({ status }) => { 
  test(`Identify how many pets share the same name with status = '${status}'`,  {
    tag: '@pets',
  }, async ({ request }) => {
    const userTask = new PetTasks(request);
    let petsData: PetDataModel[] | [];
    await test.step(`Get pets by status = '${status}'`, async () => {
      petsData = await userTask.getPetsByStatus(status);     
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