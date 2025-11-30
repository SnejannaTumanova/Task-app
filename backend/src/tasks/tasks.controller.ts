import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskResponse, TasksListResponse } from './dto/task.response';

interface JwtRequest extends Request {
  user: { userId: number };
}

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Создать задачу (авторизовано)' })
  @ApiResponse({ status: 201, type: TaskResponse })
  createTask(@Body() dto: CreateTaskDto, @Req() req: JwtRequest) {
    const authorId = req.user.userId;
    return this.tasksService.createTask(dto, authorId);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список задач с пагинацией' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: TasksListResponse })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    return this.tasksService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: TaskResponse })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Обновить задачу (авторизовано)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: TaskResponse })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Удалить задачу (авторизовано)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Удалённая задача',
    type: TaskResponse,
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
