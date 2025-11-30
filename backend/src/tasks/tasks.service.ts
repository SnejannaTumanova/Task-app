import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto, authorId: number) {
    // Если исполнитель не передан, выбираем случайного пользователя (кроме автора)
    let performerId = dto.performerId;

    if (!performerId) {
      const users = await this.prisma.user.findMany({
        where: { id: { not: authorId } },
      });

      if (users.length === 0) {
        performerId = authorId;
      } else {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        performerId = randomUser.id;
      }
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        authorId,
        performerId,
      },
      include: {
        author: true,
        performer: true,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        skip,
        take: limit,
        include: { author: true, performer: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count(),
    ]);

    return {
      data: tasks,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { author: true, performer: true },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.findOne(id);

    // ✅ возвращаем вместе с author/performer, чтобы фронту было удобно
    return this.prisma.task.update({
      where: { id },
      data: dto,
      include: { author: true, performer: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
