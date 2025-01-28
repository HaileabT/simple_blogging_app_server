import { BlogI } from "../../Entites/Iblog";
import { appDataSource } from "../datasource";
import { Blog } from "../models/BlogEntity";
import { User } from "../models/UserEntity";

export class SearchRepository {
  static blogRepo = appDataSource.getRepository(Blog);
  static search: SearchRepository | null = null;

  private constructor() {}

  static getRepository() {
    if (!SearchRepository.search) {
      SearchRepository.search = new SearchRepository();
    }
    return SearchRepository.search;
  }

  async searchByTitle(keyword: string): Promise<BlogI[]> {
    const blogs = await SearchRepository.blogRepo
      .createQueryBuilder("blog")
      .where("blog.title Like :keyword", { keyword: `%${keyword}%` })
      .getMany();

    return blogs;
  }

  async searchByUser(user: User): Promise<Blog[]> {
    const blogs = await SearchRepository.blogRepo
      .createQueryBuilder("blog")
      .leftJoinAndSelect("blog.user", "user")
      .where("user.name Like :username", { username: `%${user.name}%` })
      .getMany();

    return blogs;
  }
}
