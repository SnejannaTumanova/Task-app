import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Обновить документацию' })
  @IsOptional()
  @IsString({ message: 'title должен быть строкой' })
  title?: string;

  @ApiPropertyOptional({ example: 'Добавить раздел про Swagger' })
  @IsOptional()
  @IsString({ message: 'description должен быть строкой' })
  description?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'performerId должен быть целым числом' })
  @Min(1, { message: 'performerId должен быть >= 1' })
  performerId?: number;
}
