import { BlogI } from "../../Entites/Iblog";
import { appDataSource } from "../datasource";
import { Blog } from "../models/BlogEntity";
import { User } from "../models/UserEntity";

export class blogRepository {
  static blogRepo = appDataSource.getRepository(Blog);
  static repo: blogRepository | null = null;

  private constructor() {}

  static getRepository() {
    if (!blogRepository.repo) {
      blogRepository.repo = new blogRepository();
    }

    return blogRepository.repo;
  }
  async find(): Promise<BlogI[]> {
    const blogs = await blogRepository.blogRepo.find({ relations: ["user"] });
    return blogs;
  }

  async create(title: string, body: string, user: User): Promise<Blog> {
    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.body = body;
    newBlog.user = user;
    const blog = await blogRepository.blogRepo.save(newBlog);
    return blog;
  }

  async delete(id: string) {
    const blog = await blogRepository.blogRepo.findOne({ where: { id: id } });
    if (!blog) throw new Error("user not found");

    const deletedBlog = blogRepository.blogRepo.delete(blog);
    return deletedBlog;
  }
}
