import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";
import { Question } from "./Question";
import { User } from "./User";
import { QuizType } from "./QuizType";
import { Subject } from "./Subject";

@Index("quiz_pkey", ["id"], { unique: true })
@Entity("quiz", { schema: "public" })
export class Quiz {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("character varying", { name: "description", length: 255 })
  description: string;

  @Column("boolean", { name: "is_public" })
  isPublic: boolean;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Game, (game) => game.quiz)
  games: Game[];

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn([{ name: "created_by_id", referencedColumnName: "id" }])
  createdBy: User;

  @ManyToOne(() => QuizType, (quizType) => quizType.quizzes)
  @JoinColumn([{ name: "quiz_type_id", referencedColumnName: "id" }])
  quizType: QuizType;

  @ManyToOne(() => Subject, (subject) => subject.quizzes)
  @JoinColumn([{ name: "subject_id", referencedColumnName: "id" }])
  subject: Subject;
}
