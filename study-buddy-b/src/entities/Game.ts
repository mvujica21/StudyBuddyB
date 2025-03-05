import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuizType } from "./QuizType";
import { Quiz } from "./Quiz";
import { GameResult } from "./GameResult";

@Entity("game", { schema: "public" })
export class Game {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("timestamp without time zone", { name: "started_at" })
  startedAt!: Date;

  @Column("timestamp without time zone", { name: "ended_at", nullable: true })
  endedAt!: Date | null;

  @ManyToOne(() => QuizType, (quizType) => quizType.games)
  @JoinColumn([{ name: "game_mode_id", referencedColumnName: "id" }])
  gameMode!: QuizType;

  @ManyToOne(() => Quiz, (quiz) => quiz.games)
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz!: Quiz;

  @OneToMany(() => GameResult, (gameResult) => gameResult.game)
  gameResults!: GameResult[];
}
