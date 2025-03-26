import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupUser } from './GroupUser';

@Entity('group_role', { schema: 'public' })
export class GroupRole {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id!: number;

    @Column('character varying', { name: 'name', length: 255 })
    name!: string;

    @Column('character varying', { name: 'description', nullable: true, length: 255 })
    description!: string | null;

    @OneToMany(() => GroupUser, (groupUser) => groupUser.groupRole)
    groupUsers!: GroupUser[];
}