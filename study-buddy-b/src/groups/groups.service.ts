import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupUser } from 'src/entities/GroupUser';
import { UserGroup } from 'src/entities/UserGroup';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/createGroup.dto';

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
    async createGroup(groupData: CreateGroupDto): Promise<string>{
        const {name, description, createdBy} = groupData;
        const group = this.userGroupRepository.create({
            name, description, createdBy: {id: createdBy}, createdAt: new Date()
        });
        try {
            const savedGroup = await this.userGroupRepository.save(group);
            const clubMember = this.groupUserRepository.create({
                groupId: savedGroup.id,
                userId: createdBy,
                joinedAt: new Date(),
                groupRole: {id: 1}
            });
            await this.groupUserRepository.save(clubMember);
            return "Group sucesfully created!";
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
