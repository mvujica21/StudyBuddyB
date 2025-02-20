import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupUser } from "./GroupUser";
import { User } from "./User";

@Index("user_group_pkey", ["id"], { unique: true })
@Entity("user_group", { schema: "public" })
export class UserGroup {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group)
  groupUsers: GroupUser[];

  @ManyToOne(() => User, (user) => user.userGroups)
  @JoinColumn([{ name: "created_by_id", referencedColumnName: "id" }])
  createdBy: User;
}
