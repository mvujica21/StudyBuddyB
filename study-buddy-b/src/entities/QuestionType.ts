import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("question_type", { schema: "public" })
export class QuestionType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "description", length: 255 })
  description: string;

  @OneToMany(() => Question, (question) => question.questionType)
  questions: Question[];
}
