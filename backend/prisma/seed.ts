import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface TaskSeed {
  title: string;
  description: string;
  authorId: number;
  performerId: number;
}

async function main() {
  const pass = await bcrypt.hash('password123', 10);

  // Моковые пользователи
  const mockUsers = [
    { email: 'ivan.petrov@example.com', name: 'Иван Петров', password: pass },
    {
      email: 'olga.smirnova@example.com',
      name: 'Ольга Смирнова',
      password: pass,
    },
    {
      email: 'alex.kuznetsov@example.com',
      name: 'Алексей Кузнецов',
      password: pass,
    },
  ];

  await prisma.user.createMany({
    data: mockUsers,
    skipDuplicates: true,
  });

  console.log('✅ Пользователи созданы');

  const users = await prisma.user.findMany();

  // Заголовки задач
  const taskTitles: string[] = [
    'Создать учётную запись новому сотруднику',
    'Связаться с группой по дизайну',
    'Перенести урок Алгебры и предупредить родителей',
    'Обновить документацию по API',
    'Провести тестирование нового функционала',
    'Настроить CI/CD pipeline',
    'Создать презентацию для клиента',
    'Согласовать бюджет с руководством',
    'Подготовить отчёт по проекту',
    'Организовать встречу с командой',
    'Проверить корректность данных в отчётах',
    'Подготовить коммерческое предложение',
    'Обновить страницу “О компании”',
    'Запланировать ревью кода',
    'Проанализировать обратную связь пользователей',
    'Оптимизировать запросы к базе данных',
    'Создать макеты UX-дизайна',
    'Провести аудит безопасности',
    'Настроить мониторинг сервера',
    'Подготовить техническое задание',
  ];

  // Создаём массив задач с собственным типом
  const tasks: TaskSeed[] = [];

  for (let i = 0; i < taskTitles.length; i++) {
    const author = users[Math.floor(Math.random() * users.length)];

    let performer;
    do {
      performer = users[Math.floor(Math.random() * users.length)];
    } while (performer.id === author.id);

    tasks.push({
      title: taskTitles[i],
      description: taskTitles[i],
      authorId: author.id,
      performerId: performer.id,
    });
  }

  await prisma.task.createMany({ data: tasks });

  console.log('✅ 20 реалистичных задач созданы');
}

main()
  .then(() => console.log('🎉 Seed completed successfully!'))
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
