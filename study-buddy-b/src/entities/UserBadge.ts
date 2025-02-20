import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Badge } from "./Badge";
import { User } from "./User";

@Index("user_badge_pkey", ["badgeId", "userId"], { unique: true })
@Entity("user_badge", { schema: "public" })
export class UserBadge {
  @Column("integer", { primary: true, name: "user_id" })
  userId: number;

  @Column("integer", { primary: true, name: "badge_id" })
  badgeId: number;

  @Column("timestamp without time zone", { name: "awarded_at", nullable: true })
  awardedAt: Date | null;

  @ManyToOne(() => Badge, (badge) => badge.userBadges)
  @JoinColumn([{ name: "badge_id", referencedColumnName: "id" }])
  badge: Badge;

  @ManyToOne(() => User, (user) => user.userBadges)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
