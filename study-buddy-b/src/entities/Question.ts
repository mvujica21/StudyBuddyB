import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { QuestionType } from "./QuestionType";
import { Quiz } from "./Quiz";
import { QuestionandanswerLog } from "./QuestionandanswerLog";

@Entity("question", { schema: "public" })
export class Question {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "content", length: 255 })
  content!: string;

  @Column("integer", { name: "difficulty", nullable: true })
  difficulty!: number | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];

  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  @JoinColumn([{ name: "question_type_id", referencedColumnName: "id" }])
  questionType!: QuestionType;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz!: Quiz;

  @OneToMany(
    () => QuestionandanswerLog,
    (questionandanswerLog) => questionandanswerLog.question
  )
  questionandanswerLogs!: QuestionandanswerLog[];
}
