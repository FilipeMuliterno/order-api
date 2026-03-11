import { IUserRepository } from "../../../domain/repositories/IUserRepository";

interface DeleteUserRequest {
  id: number;
}

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: DeleteUserRequest): Promise<void> {
    await this.userRepository.delete(data.id);
  }
}
