import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from 'src/entities/GroupUser';
import { UserGroup } from 'src/entities/UserGroup';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
  imports: [TypeOrmModule.forFeature([GroupUser, UserGroup])]
})
export class GroupsModule { }
