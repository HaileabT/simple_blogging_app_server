import { HashingServiceProvider } from "../../services/hash/hash.service";
import { appDataSource } from "../datasource";
import { User } from "../models/UserEntity";

export class UserRepository {
  static typeormRepo = appDataSource.getRepository(User);
  static repo: UserRepository | null = null;

  private constructor() {}

  static getRepository() {
    if (!UserRepository.repo) {
      UserRepository.repo = new UserRepository();
    }

    return UserRepository.repo;
  }

  async findByName(name: string): Promise<User | null> {
    const user = await UserRepository.typeormRepo.findOneBy({ name });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await UserRepository.typeormRepo.findOneBy({ id });

    if (!user) throw new Error("User not found.");

    return user;
  }

  async create(name: string, password: string): Promise<User> {
    const checkUser = await UserRepository.typeormRepo.findOneBy({ name });

    if (checkUser) throw new Error("Duplicate user.");

    const hashedPassword = await HashingServiceProvider.getProvider().hash(password);

    const userToBeSaved = new User();

    userToBeSaved.name = name;
    userToBeSaved.password = hashedPassword;

    const user = await UserRepository.typeormRepo.save(userToBeSaved);

    return user;
  }
}
