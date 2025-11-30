import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов' })
  password!: string;

  @IsString({ message: 'Имя должно быть строкой' })
  name!: string;
}

// Интерфейс для безопасного возврата пользователя (без пароля)
export interface UserEntity {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}
