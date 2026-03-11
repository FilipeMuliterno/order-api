//conexão com BD
//Ela permite que decorators do TypeScript funcionem em runtime.
// O TypeORM usa decorators como:
// @Entity()
// @Column()
// @PrimaryGeneratedColumn()
// Esses decorators precisam acessar metadados da classe, e quem fornece isso é o reflect-metadata.
import "reflect-metadata";
import { DataSource } from "typeorm"; //Conexão com o BD em si usando o typeOrm como intermedio
import { User } from "../typeorm/entities/User"; //Entidade/Tabela do BD

//abre a conexão com o BD passando os parametros necessarios
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, //não cria a tabela caso não exista
  logging: false,
  entities: [User], //passa as entidades/tabelas
});
