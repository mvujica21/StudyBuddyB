import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("user_type", { schema: "public" })
export class UserType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "type_name", length: 255 })
  typeName: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
