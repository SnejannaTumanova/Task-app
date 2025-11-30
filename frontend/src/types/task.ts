export type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  createdAt: string;
  authorId: number;
  performerId: number;
  author: User;
  performer: User;
};

export type TasksResponse = {
  data: Task[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
