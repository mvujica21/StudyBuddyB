import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }
    async register(registerDto: RegisterDto): Promise<User> {
        const { email, password, confirmPassword, username } = registerDto;
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('User with that email already exists');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            email,
            username,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date(),
            xp: 0,
            userType: { id: 1 },
        });

        try {
            await this.userRepository.save(user);
            return user;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new BadRequestException('Invalid password');
        }
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
