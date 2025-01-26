import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./BlogEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ select: true })
  password!: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blog?: Blog[];
}
