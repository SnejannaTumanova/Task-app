import { ApiProperty } from '@nestjs/swagger';

class UserShortResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'ivan.petrov@example.com' })
  email!: string;

  @ApiProperty({ example: 'Иван Петров' })
  name!: string;

  @ApiProperty({ example: '2025-11-30T10:00:00.000Z' })
  createdAt!: Date;
}

export class TaskResponse {
  @ApiProperty({ example: 10 })
  id!: number;

  @ApiProperty({ example: 'Сделать ревью PR' })
  title!: string;

  @ApiProperty({
    example: 'Проверить модуль tasks',
    nullable: true,
    required: false,
  })
  description?: string | null;

  @ApiProperty({ example: '2025-11-30T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: 1 })
  authorId!: number;

  @ApiProperty({ example: 2 })
  performerId!: number;

  @ApiProperty({ type: () => UserShortResponse })
  author!: UserShortResponse;

  @ApiProperty({ type: () => UserShortResponse })
  performer!: UserShortResponse;
}

export class TasksMetaResponse {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 20 })
  total!: number;

  @ApiProperty({ example: 2 })
  pages!: number;
}

export class TasksListResponse {
  @ApiProperty({ type: () => [TaskResponse] })
  data!: TaskResponse[];

  @ApiProperty({ type: () => TasksMetaResponse })
  meta!: TasksMetaResponse;
}
