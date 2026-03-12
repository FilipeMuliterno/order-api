import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/useCases/users/CreateUserUseCase";
import { DeleteUserUseCase } from "../../../application/useCases/users/DeleteUserUseCase";
import { FindUserByIdUseCase } from "../../../application/useCases/users/FindUserByIdUserCase";
import { UpdateUserUseCase } from "../../../application/useCases/users/UpdateUserUseCase";
import { TypeORMUserRepository } from "../../typeorm/TypeORMUserRepository";

export class UserController {
  //Metodo do controller
  async create(req: Request, res: Response) {
    //Dados vindo pelo body
    const { name, email, role } = req.body;
    //Instancia o repositorio
    const repository = new TypeORMUserRepository();
    //Instancia o useCase com base no repositorio desejado
    const createUseCase = new CreateUserUseCase(repository);
    //Cria o usuario
    const user = await createUseCase.execute({ name, email, role });
    //Retorna o status 201 e o usuario
    return res.status(201).json(user); //201 = criado
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repository = new TypeORMUserRepository();
    const findUserByIdUseCase = new FindUserByIdUseCase(repository);
    const user = await findUserByIdUseCase.execute({ id });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return res.status(200).json(user); //200 = ok
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email, role } = req.body;
    const repository = new TypeORMUserRepository();
    const updateUseCase = new UpdateUserUseCase(repository);
    const user = await updateUseCase.execute({ id, name, email, role });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repository = new TypeORMUserRepository();
    const deleteUseCase = new DeleteUserUseCase(repository);
    const findByIdUseCase = new FindUserByIdUseCase(repository);
    const user = await findByIdUseCase.execute({ id });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    await deleteUseCase.execute({ id });
    return res.status(204).send(); //204 = sem conteudo
  }
}
