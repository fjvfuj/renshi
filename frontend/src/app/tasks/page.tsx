'use client';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done';
}

export default function TasksPage() {
  const [tasks] = useState<Task[]>([
    { id: '1', title: '完成季度报表', assignee: '张三', deadline: '2026-03-15', priority: 'high', status: 'in_progress' },
    { id: '2', title: '员工入职培训', assignee: '李四', deadline: '2026-03-20', priority: 'medium', status: 'todo' },
    { id: '3', title: '系统升级测试', assignee: '王五', deadline: '2026-03-18', priority: 'high', status: 'todo' },
    { id: '4', title: '月度考勤汇总', assignee: '赵六', deadline: '2026-03-12', priority: 'low', status: 'done' },
  ]);

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return { bg: '#fef2f2', color: '#dc2626' };
      case 'medium': return { bg: '#fffbeb', color: '#d97706' };
      case 'low': return { bg: '#f0fdf4', color: '#16a34a' };
      default: return {};
    }
  };

  const getStatusText = (s: string) => {
    switch(s) {
      case 'todo': return '待开始';
      case 'in_progress': return '进行中';
      case 'done': return '已完成';
      default: return s;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>任务管理</span>
        </div>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ 新建任务</button>
      </header>

      <main style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '待处理', count: tasks.filter(t => t.status === 'todo').length, color: '#6b7280' },
            { label: '进行中', count: tasks.filter(t => t.status === 'in_progress').length, color: '#2563eb' },
            { label: '已完成', count: tasks.filter(t => t.status === 'done').length, color: '#10b981' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: item.color }}>{item.count}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>任务列表</h2>
          {tasks.map(task => {
            const p = getPriorityColor(task.priority);
            return (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: '#1f2937', marginBottom: '4px' }}>{task.title}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>{task.assignee} · {task.deadline}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: p.bg, color: p.color }}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                    {getStatusText(task.status)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
