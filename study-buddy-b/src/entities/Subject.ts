import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quiz } from "./Quiz";

@Entity("subject", { schema: "public" })
export class Subject {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name", length: 255 })
  name!: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description!: string | null;

  @OneToMany(() => Quiz, (quiz) => quiz.subject)
  quizzes!: Quiz[];
}
