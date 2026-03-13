import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { Email } from "../../../domain/values-objects/Email";

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
    const email = new Email(data.email);
    user.name = data.name;
    user.email = email;
    user.role = data.role;
    const userUpdate = await this.userRepository.update(user);
    return userUpdate;
  }
}
