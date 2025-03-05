import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/User';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserGroup } from 'src/entities/UserGroup';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getMyProfile(@Request() req: { user: { userId: number } }): Promise<{ user: User; userGroups: UserGroup[] }> {
        const userId = req.user.userId;
        return await this.profileService.getMyProfile(userId);
    }
}
