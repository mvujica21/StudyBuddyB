import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupUser } from 'src/entities/GroupUser';
import { UserGroup } from 'src/entities/UserGroup';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(UserGroup)
        private readonly userGroupRepository: Repository<UserGroup>,
        @InjectRepository(GroupUser)
        private readonly groupUserRepository: Repository<GroupUser>
    ) { }
    async userGroups(userId: number): Promise<UserGroup[]> {
        const groupUsers = await this.groupUserRepository
            .createQueryBuilder('groupUser')
            .innerJoinAndSelect('groupUser.group', 'userGroup')
            .where('groupUser.userId = :userId', { userId })
            .getMany();
        return groupUsers.map((groupUser) => groupUser.group);
    }
    async getGroupData(groupId: number): Promise<UserGroup>{
        const groupData = await this.userGroupRepository.findOne({where: {id: groupId}})
        if(!groupData){
            throw new NotFoundException()
        }
        return groupData;
    }
    async getAllGroups():Promise<UserGroup[]>{
        return await this.userGroupRepository.find();
    }
}
