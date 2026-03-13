import { Email } from "../values-objects/Email";

//Aqui não há TypeORM, banco, ou qualquer framework — regra de negócio pura.
export class User {
  public id!: number;
  public createdAt!: Date;

  constructor(public name: string, public email: Email, public role: string) {}
}
