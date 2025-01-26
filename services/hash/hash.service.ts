import bcrypt from "bcryptjs";
import { AppError } from "../../shared/datastructures/AppError";

export class HashingServiceProvider {
  static hashService: HashingServiceProvider | null = null;

  private constructor() {}

  static getProvider() {
    if (!HashingServiceProvider.hashService) {
      HashingServiceProvider.hashService = new HashingServiceProvider();
    }
    return HashingServiceProvider.hashService;
  }

  async hash(word: string) {
    const hashedWord = await bcrypt.hash(word, 10);

    return hashedWord;
  }

  async verify(word: string, hashedWord: string) {
    const com = await bcrypt.compare(word, hashedWord);

    return com;
  }
}
