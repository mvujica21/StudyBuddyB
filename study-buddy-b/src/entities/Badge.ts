import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserBadge } from "./UserBadge";

@Entity("badge", { schema: "public" })
export class Badge {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "description", length: 255 })
  description: string;

  @Column("character varying", { name: "icon", nullable: true, length: 255 })
  icon: string | null;

  @OneToMany(() => UserBadge, (userBadge) => userBadge.badge)
  userBadges: UserBadge[];
}
