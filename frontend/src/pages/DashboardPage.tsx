import React, { useState } from 'react';
import { Button } from 'antd';
import Header from '@/components/Header';
import { TasksTable } from '@/components/tasks/TasksTable';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';

const DashboardPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"User"}');

  const [createOpen, setCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <Header user={user} />

      <div style={{ padding: 50, maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <h1 style={{ margin: 0 }}>Список задач</h1>

          <Button type="primary" onClick={() => setCreateOpen(true)}>
            + Создать задачу
          </Button>
        </div>

        <TasksTable refreshKey={refreshKey} />
      </div>

      <CreateTaskModal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onCreated={() => {
          setCreateOpen(false);
          setRefreshKey(k => k + 1);
        }}
      />
    </div>
  );
};

export default DashboardPage;
