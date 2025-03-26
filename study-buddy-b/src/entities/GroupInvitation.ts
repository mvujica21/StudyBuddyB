import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UserGroup } from './UserGroup';
  import { User } from './User';
  
  @Entity('invitation', { schema: 'public' })
  export class GroupInvitation {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id!: number;
  
    @Column('character varying', { name: 'token', length: 64, unique: true })
    token!: string;
  
    @Column('timestamp without time zone', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
  
    @Column('timestamp without time zone', { name: 'expires_at' })
    expiresAt!: Date;
  
    @Column('boolean', { name: 'is_used', default: false })
    isUsed!: boolean;
  
    @Column('integer', { name: 'max_uses', nullable: true, default: () => '1' })
    maxUses!: number | null;
  
    @Column('integer', { name: 'current_uses', nullable: true, default: () => '0' })
    currentUses!: number | null;
  
    @ManyToOne(() => UserGroup, (userGroup) => userGroup.invitations)
    @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
    group!: UserGroup;
  
    @ManyToOne(() => User, (user) => user.createdInvitations)
    @JoinColumn([{ name: 'created_by_id', referencedColumnName: 'id' }])
    createdBy!: User;
  }
  