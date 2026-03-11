//Ela permite que decorators do TypeScript funcionem em runtime.
// O TypeORM usa decorators como:
// @Entity()
// @Column()
// @PrimaryGeneratedColumn()
// Esses decorators precisam acessar metadados da classe, e quem fornece isso é o reflect-metadata.
import "reflect-metadata";
//uso do .env
import "dotenv/config";
import { app } from "./app";

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
