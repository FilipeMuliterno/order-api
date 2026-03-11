//Define o contrato que qualquer repositório de usuário precisa seguir.
import { User } from "../entities/User";

export interface IUserRepository {
  //Passa como parametro oq precisa para realizar a ação e Promise<Retorno> é oq retorna da função
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>; //Retorno: Promise<User | null> → retorna a entity se existir, ou null se não achar.
  update(user: User): Promise<User | null>;
  delete(id: number): Promise<void>;
}
