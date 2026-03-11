//Basicamente a tabela do BD
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users") //nome da tabela no BD
export class User {
  @PrimaryGeneratedColumn() //PrimaryGeneratedColumn() → o banco gera automaticamente um número único para cada registro.
  public id!: number;

  @Column({ length: 100 })
  public name!: string;

  @Column({ length: 150 })
  public email!: string;

  @Column({ length: 20 })
  public role!: string;

  @CreateDateColumn({ name: "created_at" }) // Coluna que registra automaticamente quando o registro foi criado. { name: "created_at" } → define o nome da coluna no banco (snake_case) enquanto a propriedade no TypeScript é camelCase.
  public createdAt!: Date;
}
