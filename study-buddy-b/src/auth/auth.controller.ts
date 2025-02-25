import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    async login(@Body() body: LoginDto): Promise<{ message: string, JWT: string }> {
        const result = await this.authService.login(body);
        return { message: 'Login successful', JWT: result.access_token };
    }
    @Get('protected')
    @UseGuards(JwtAuthGuard)
    protected(): { message: string } {
        return { message: 'You are authorized to view this page' };
    }
}
