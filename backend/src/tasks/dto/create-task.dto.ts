import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Сделать ревью PR' })
  @IsString({ message: 'title должен быть строкой' })
  title!: string;

  @ApiPropertyOptional({ example: 'Проверить изменения в модуле tasks' })
  @IsOptional()
  @IsString({ message: 'description должен быть строкой' })
  description?: string;

  @ApiPropertyOptional({
    example: 2,
    description:
      'ID исполнителя. Если не передан — назначится случайный пользователь.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'performerId должен быть целым числом' })
  @Min(1, { message: 'performerId должен быть >= 1' })
  performerId?: number;
}
