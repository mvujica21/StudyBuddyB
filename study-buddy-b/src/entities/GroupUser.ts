import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { UserGroup } from "./UserGroup";
import { User } from "./User";
import { GroupRole } from "./GroupRole";

@Index("group_user_pkey", ["groupId", "userId"], { unique: true })
@Entity("group_user", { schema: "public" })
export class GroupUser {
  @Column("integer", { primary: true, name: "group_id" })
  groupId!: number;

  @Column("integer", { primary: true, name: "user_id" })
  userId!: number;

  @Column("timestamp without time zone", { name: "joined_at" })
  joinedAt!: Date;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.groupUsers)
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group!: UserGroup;

  @ManyToOne(() => User, (user) => user.groupUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
  @ManyToOne(() => GroupRole, (groupRole) => groupRole.groupUsers)
  @JoinColumn([{ name: 'group_role_id', referencedColumnName: 'id' }])
  groupRole!: GroupRole;
}
