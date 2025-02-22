import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameResult } from "./GameResult";
import { GroupUser } from "./GroupUser";
import { Notification } from "./Notification";
import { QuestionandanswerLog } from "./QuestionandanswerLog";
import { Quiz } from "./Quiz";
import { UserType } from "./UserType";
import { UserBadge } from "./UserBadge";
import { UserGroup } from "./UserGroup";

@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "username", length: 255 })
  username: string;

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("integer", { name: "xp", nullable: true })
  xp: number | null;

  @OneToMany(() => GameResult, (gameResult) => gameResult.user)
  gameResults: GameResult[];

  @OneToMany(() => GroupUser, (groupUser) => groupUser.user)
  groupUsers: GroupUser[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(
    () => QuestionandanswerLog,
    (questionandanswerLog) => questionandanswerLog.user
  )
  questionandanswerLogs: QuestionandanswerLog[];

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quizzes: Quiz[];

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn([{ name: "user_type_id", referencedColumnName: "id" }])
  userType: UserType;

  @OneToMany(() => UserBadge, (userBadge) => userBadge.user)
  userBadges: UserBadge[];

  @OneToMany(() => UserGroup, (userGroup) => userGroup.createdBy)
  userGroups: UserGroup[];
}
