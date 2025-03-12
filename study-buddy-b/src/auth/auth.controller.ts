import { Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<{ message: string }> {
        await this.authService.register(body);
        return { message: 'Registration successful' };
    }
    @Post('login')
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res: Response): Promise<{ message: string }> {
        const result = await this.authService.login(body);
        res.cookie('jwt', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });
        return { message: 'Login successful' };
    }
    @Get('protected')
    @UseGuards(JwtAuthGuard)
    protected(): { message: string } {
        return { message: 'You are authorized to view this page' };
    }
}
