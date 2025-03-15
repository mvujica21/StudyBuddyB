import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserGroup } from 'src/entities/UserGroup';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService,
    ){}
    
    @Get("getGroupData")
    @UseGuards(JwtAuthGuard)
    async getGroupData(@Query('groupId') groupId:number): Promise<UserGroup>{
        return await this.groupsService.getGroupData(groupId);
    }
}
