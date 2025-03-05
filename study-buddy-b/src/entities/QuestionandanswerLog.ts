import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Entity("questionandanswer_log", { schema: "public" })
export class QuestionandanswerLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("boolean", { name: "was_correct" })
  wasCorrect!: boolean;

  @Column("timestamp without time zone", { name: "answered_at" })
  answeredAt!: Date;

  @ManyToOne(() => Question, (question) => question.questionandanswerLogs)
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question!: Question;

  @ManyToOne(() => User, (user) => user.questionandanswerLogs)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
