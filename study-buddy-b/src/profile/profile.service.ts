import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { UserGroup } from 'src/entities/UserGroup';
import { GroupsService } from 'src/groups/groups.service';
import { Repository } from 'typeorm';

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

}
