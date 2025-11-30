import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // Регистрация пользователя
  async register(dto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    // Проверяем, существует ли email
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    // Хэшируем пароль
    const hash = await bcrypt.hash(dto.password, 10);

    // Создаём пользователя
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        name: dto.name,
      },
    });

    // Возвращаем без пароля
    const { password, ...userSafe } = user;
    return userSafe;
  }

  // Логин
  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; user: Omit<UserEntity, 'password'> }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({ userId: user.id });
    const { password, ...userSafe } = user;

    return { access_token: token, user: userSafe };
  }

  // Валидация пользователя по email и паролю
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...userSafe } = user;
    return userSafe;
  }
}
