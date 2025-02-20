import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';

@Index('answer_pkey', ['id'], { unique: true })
@Entity('answer', { schema: 'public' })
export class Answer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'content', length: 255 })
  content: string;

  @Column('boolean', { name: 'is_correct', nullable: true })
  isCorrect: boolean | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: Question;
}
