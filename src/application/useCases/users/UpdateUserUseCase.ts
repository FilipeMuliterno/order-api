import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

interface UpdateUserRequest {
  id: number;
  name: string;
  email: string;
  role: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UpdateUserRequest): Promise<User | null> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      return null;
    }
    user.name = data.name;
    user.email = data.email;
    user.role = data.role;
    const userUpdate = await this.userRepository.update(user);
    return userUpdate;
  }
}
