import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./UserEntity";
@Entity()
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @ManyToOne(() => User, (user) => user.blog)
  user?: User;
}
