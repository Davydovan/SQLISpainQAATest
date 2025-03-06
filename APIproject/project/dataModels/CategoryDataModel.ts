export class CategoryDataModel {
    id!: number;
  
    name: string | undefined;
  
    constructor(
      id: number,
      name?: string | undefined
    ) {
      this.id = id;
      this.name = name;
    }
  }
  