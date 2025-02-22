import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";
import { User } from "./User";

@Entity("game_result", { schema: "public" })
export class GameResult {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "score" })
  score: number;

  @Column("integer", { name: "rank", nullable: true })
  rank: number | null;

  @Column("timestamp without time zone", {
    name: "completed_at",
    nullable: true,
  })
  completedAt: Date | null;

  @ManyToOne(() => Game, (game) => game.gameResults)
  @JoinColumn([{ name: "game_id", referencedColumnName: "id" }])
  game: Game;

  @ManyToOne(() => User, (user) => user.gameResults)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
