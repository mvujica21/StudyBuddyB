import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/User';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserGroup } from 'src/entities/UserGroup';
import { UpdateProfileDto } from './dto/updateProfile.dto';

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
    @Post('/update')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Request() req: { user: { userId: number } },
        @Body() updateProfileDto: UpdateProfileDto)
        : Promise<User> {
        const userId = req.user.userId;
        return await this.profileService.updateProfile(userId, updateProfileDto);

    }
}
