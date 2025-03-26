import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserGroup } from 'src/entities/UserGroup';
import { CreateGroupDto } from './dto/createGroup.dto';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService,
    ){}
    
    @Get("getGroupData")
    @UseGuards(JwtAuthGuard)
    async getGroupData(@Query('groupId') groupId:number): Promise<UserGroup>{
        return await this.groupsService.getGroupData(groupId);
    }
    @Get("getAllGroups")
    @UseGuards(JwtAuthGuard)
    async getallGroups(): Promise<UserGroup[]>{
        return await this.groupsService.getAllGroups();
    }
    @Post("createGroup")
    @UseGuards(JwtAuthGuard)
    async createGroup(@Body() body: CreateGroupDto): Promise<{message: string}>{
        await this.groupsService.createGroup(body);
        return {message: "Group created succesfully"}
    }
}
