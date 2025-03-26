import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from 'src/entities/GroupUser';
import { UserGroup } from 'src/entities/UserGroup';
import { GroupInvitation } from 'src/entities/GroupInvitation';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
  imports: [TypeOrmModule.forFeature([GroupUser, UserGroup, GroupInvitation])]
})
export class GroupsModule { }
