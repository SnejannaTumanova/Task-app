import { useEffect, useMemo, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip, Typography, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { Task } from '@/types/task';
import { deleteTask, getTasks } from '@/api/tasks';
import { EditTaskModal } from './EditTaskModal';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const { Text } = Typography;

type Props = {
  refreshKey?: number; // чтобы можно было рефрешить снаружи
};

export function TasksTable({ refreshKey = 0 }: Props) {
  const [items, setItems] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await getTasks(page, limit);
      setItems(res.data);
      setTotal(res.meta.total);
    } catch (e: any) {
      message.error(e?.response?.data?.message ?? 'Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, refreshKey]);

  const onTableChange = (p: TablePaginationConfig) => {
    if (p.current) setPage(p.current);
    if (p.pageSize) setLimit(p.pageSize);
  };

  const columns: ColumnsType<Task> = useMemo(
    () => [
      {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
        render: v => <Text strong>{v}</Text>,
      },
      {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        render: v => v || '—',
      },
      {
        title: 'Автор',
        dataIndex: ['author', 'name'],
        key: 'author',
        render: (_, t) => `${t.author.name}`,
      },
      {
        title: 'Исполнитель',
        dataIndex: ['performer', 'name'],
        key: 'performer',
        render: (_, t) => `${t.performer.name}`,
      },
      {
        title: 'Создано',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: v => new Date(v).toLocaleString(),
      },
      {
        title: 'Действия',
        key: 'actions',
        width: 130,
        align: 'center',
        render: (_, task) => (
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 44,
            }}
          >
            <Tooltip title="Редактирование" placement="topLeft">
              <Button
                type="text"
                size="small"
                icon={<AiOutlineEdit size={18} />}
                onClick={() => setEditingTask(task)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  padding: 4,
                }}
              />
            </Tooltip>
            <Popconfirm
              title="Удалить задачу?"
              okText="Да"
              cancelText="Нет"
              onConfirm={async () => {
                try {
                  await deleteTask(task.id);
                  message.success('Задача удалена');

                  if (items.length === 1 && page > 1) {
                    setPage(page - 1);
                  } else {
                    load();
                  }
                } catch (e: any) {
                  message.error(e?.response?.data?.message ?? 'Не удалось удалить задачу');
                }
              }}
            >
              <Tooltip title="Удаление" placement="bottomRight">
                <Button
                  danger
                  type="text"
                  size="small"
                  icon={<AiOutlineDelete size={18} />}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 2,
                  }}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [items.length, page],
  );

  return (
    <>
      <Table<Task>
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          showSizeChanger: true,
        }}
        onChange={pagination => onTableChange(pagination)}
      />

      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onCancel={() => setEditingTask(null)}
        onSaved={() => {
          setEditingTask(null);
          load();
        }}
      />
    </>
  );
}
