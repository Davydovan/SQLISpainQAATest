import { CategoryDataModel } from "./CategoryDataModel";
import { TagDataModel } from "./TagDataModel";

export class PetDataModel {
  id!: number;

  category: CategoryDataModel | undefined;

  name!: string;

  photoUrls: string[] | [];

  tags: TagDataModel[] | [];

  status!: string;

  constructor(
    id: number,
    category: CategoryDataModel | undefined,
    name: string,
    photoUrls: string[] | [],
    tags: TagDataModel[] | [],
    status: string
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.photoUrls = photoUrls;
    this.tags = tags;
    this.status = status;
  }
}

export function generatePetTuples(data: PetDataModel[]): [number, string][] {
  return data.map((pet) => [pet.id, pet.name]);
}
