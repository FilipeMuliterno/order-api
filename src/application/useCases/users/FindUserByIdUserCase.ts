import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

interface FindUserByIdRequest {
  id: number;
}

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: FindUserByIdRequest): Promise<User | null> {
    const user = await this.userRepository.findById(data.id);
    return user;
  }
}
