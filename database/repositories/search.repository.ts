import { BlogI } from "../../Entites/Iblog";
import { appDataSource } from "../datasource";
import { Blog } from "../models/BlogEntity";

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
}
