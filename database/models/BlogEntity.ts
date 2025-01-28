import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
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
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user!: User;

  @CreateDateColumn()
  Date!: Date;
}
