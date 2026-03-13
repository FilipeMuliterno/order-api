// Implementa a interface IUserRepository.
// Conecta com o banco usando TypeORM.
// Traduz DomainUser ↔ ORMUser internamente.
// Mantém o domínio desacoplado da infraestrutura.

import { Repository } from "typeorm"; //Basicamente funções do TypeORM
import { IUserRepository } from "../../domain/repositories/IUserRepository"; //Essa interface define o contrato que qualquer repositório deve seguir.
import { User as DomainUser } from "../../domain/entities/User"; //entidade do dominio
import { User as ORMUser } from "./entities/User"; //entidade usada pelo typeORM
import { AppDataSource } from "../database/data-source"; //conexão com o BD
import { Email } from "../../domain/values-objects/Email";

//cria o repositorio com base o IUserRepositorio para definir o contrato a seguir
export class TypeORMUserRepository implements IUserRepository {
  //um repositório que manipula a entidade ORMUser.
  private repo: Repository<ORMUser>;

  // Quando a classe é instanciada você pega a conexão do banco e pega o repository da entidade ORMUser
  // Resultado:
  // this.repo = repository da tabela users
  // Agora você pode fazer:
  // this.repo.save()
  // this.repo.find()
  // this.repo.delete()
  constructor() {
    this.repo = AppDataSource.getRepository(ORMUser);
  }

  // Converte ORMUser → DomainUser
  //Esse método converte a entidade do banco para a entidade do domínio.
  //Na Clean Architecture domínio não conhece ORM, então precisamos converter.
  private toDomain(ormUser: ORMUser): DomainUser {
    const user = new DomainUser(
      ormUser.name,
      new Email(ormUser.email),
      ormUser.role
    );
    user.id = ormUser.id;
    user.createdAt = ormUser.createdAt;
    return user;
  }

  // Converte DomainUser → ORMUser
  //esse fez o inverso da de cima, para em funções aonde vc recebe no formato da entidade converta e passe para o BD
  private toORM(user: DomainUser): ORMUser {
    const ormUser = new ORMUser();
    ormUser.name = user.name;
    ormUser.email = user.email.getValue();
    ormUser.role = user.role;
    return ormUser;
  }

  //método de criação, aonde recebe o usuario no formato que o resto vê(entidade), tranforma no formato do ORM
  //após isso ele salva no BD, e retorna ele transformando novamente em entidade, para o resto do programa nao ver o formato de ORM
  async create(user: DomainUser): Promise<DomainUser> {
    const ormUser = this.toORM(user);
    const saved = await this.repo.save(ormUser);
    return this.toDomain(saved);
  }

  //busca o usuario pelo ID passando o ID em formato de number e retornando o usuario mas antes transformando em formato da entidade
  async findById(id: number): Promise<DomainUser | null> {
    const ormUser = await this.repo.findOneBy({ id });
    if (!ormUser) return null;
    return this.toDomain(ormUser);
  }

  //faz a atualização do user
  async update(user: DomainUser): Promise<DomainUser | null> {
    await this.repo.update(user.id, {
      name: user.name,
      email: user.email.getValue(),
      role: user.role,
    });
    const userUpdate = await this.repo.findOneBy({ id: user.id });
    if (!userUpdate) return null;
    return this.toDomain(userUpdate);
  }

  //deleta o usuario passando o id
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
