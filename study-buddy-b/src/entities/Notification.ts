import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("notification", { schema: "public" })
export class Notification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "content", length: 255 })
  content!: string;

  @Column("boolean", { name: "is_read" })
  isRead!: boolean;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
