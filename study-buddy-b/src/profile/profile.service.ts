import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { UserGroup } from 'src/entities/UserGroup';
import { GroupsService } from 'src/groups/groups.service';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly groupsService: GroupsService
    ) { }

    async getMyProfile(userId: number): Promise<{ user: User, userGroups: UserGroup[] }> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException();
        }
        const userGroups = await this.groupsService.userGroups(userId);
        return { user, userGroups };
    }
    async updateProfile(userId: number, updateData: UpdateProfileDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException();
        }
        const updatedUser = this.userRepository.merge(user, updateData);
        updatedUser.updatedAt = new Date();
        return await this.userRepository.save(updatedUser);
    }

}
