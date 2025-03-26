import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from 'src/entities/GroupUser';
import { UserGroup } from 'src/entities/UserGroup';
import { GroupInvitation } from 'src/entities/GroupInvitation';
import { GroupRole } from 'src/entities/GroupRole';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
  imports: [TypeOrmModule.forFeature([GroupUser, UserGroup, GroupInvitation, GroupRole])]
})
export class GroupsModule { }
