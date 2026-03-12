//Ela permite que decorators do TypeScript funcionem em runtime.
// O TypeORM usa decorators como:
// @Entity()
// @Column()
// @PrimaryGeneratedColumn()
// Esses decorators precisam acessar metadados da classe, e quem fornece isso é o reflect-metadata.
import "reflect-metadata";
//uso do .env
import "dotenv/config";
import { AppDataSource } from "../infrastructure/database/data-source";
import { app } from "./app";

const port = 3000;
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de Dados Conectado");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Erro ao iniciar o Banco de Dados: ${err}`);
  });
