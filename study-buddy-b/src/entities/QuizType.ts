import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";
import { Quiz } from "./Quiz";

@Index("quiz_type_pkey", ["id"], { unique: true })
@Entity("quiz_type", { schema: "public" })
export class QuizType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Game, (game) => game.gameMode)
  games: Game[];

  @OneToMany(() => Quiz, (quiz) => quiz.quizType)
  quizzes: Quiz[];
}
