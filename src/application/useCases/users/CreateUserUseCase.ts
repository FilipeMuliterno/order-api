import { IUserRepository } from "../../../domain/repositories/IUserRepository"; //Essa interface define quais operações podem ser feitas com usuários no sistema.
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/values-objects/Email";

//Essa interface define o formato e quais dos dados necessários para criar um usuário.
interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
}

export class CreateUserUseCase {
  //Aqui acontece algo muito importante chamado injeção de dependência.
  //Isso significa que o UseCase recebe um repositório pronto quando é criado
  //EX: const repository = new TypeORMUserRepository();
  // const useCase = new CreateUserUseCase(repository);
  constructor(private userRepository: IUserRepository) {}

  // Esse método representa executar a ação "criar usuário", recebendo os parametros necessarios para criar o user
  async execute(data: CreateUserRequest): Promise<User> {
    // Aqui você cria um objeto User do domínio.
    const user = new User(data.name, new Email(data.email), data.role);
    //aqui você chama o repositorio, nesse caso chamaria o typeORM ao instanciar, e então o metodo create
    //como o metodo create ja tem a conversão de entidade para entidadeORM passa os dados no formato da entidade
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}
