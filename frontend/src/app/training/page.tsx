'use client';
import { useState } from 'react';

interface Training {
  id: string;
  title: string;
  trainer: string;
  date: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function TrainingPage() {
  const [data] = useState<Training[]>([
    { id: '1', title: '新员工入职培训', trainer: '人事部', date: '2026-03-15', participants: 5, status: 'upcoming' },
    { id: '2', title: '技术分享会', trainer: '张工', date: '2026-03-12', participants: 20, status: 'ongoing' },
    { id: '3', title: '销售技巧培训', trainer: '王总', date: '2026-03-10', participants: 15, status: 'completed' },
    { id: '4', title: '安全管理培训', trainer: '保安部', date: '2026-03-05', participants: 50, status: 'completed' },
  ]);

  const getStatus = (s: string) => {
    switch(s) {
      case 'upcoming': return { text: '即将开始', bg: '#dbeafe', color: '#2563eb' };
      case 'ongoing': return { bg: '#dcfce7', color: '#16a34a' };
      case 'completed': return { bg: '#f3f4f6', color: '#6b7280' };
      default: return {};
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>培训管理</span>
        </div>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ 创建培训</button>
      </header>

      <main style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '即将开始', count: data.filter(d => d.status === 'upcoming').length, icon: '📅' },
            { label: '进行中', count: data.filter(d => d.status === 'ongoing').length, icon: '🔄' },
            { label: '已完成', count: data.filter(d => d.status === 'completed').length, icon: '✅' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{item.icon} {item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937' }}>{item.count}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>培训课程列表</h2>
          {data.map(item => {
            const s = getStatus(item.status);
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: '#1f2937', marginBottom: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>讲师: {item.trainer} · {item.date}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>👥 {item.participants}人</span>
                  <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', backgroundColor: s.bg, color: s.color }}>
                    {item.status === 'upcoming' ? '即将开始' : item.status === 'ongoing' ? '进行中' : '已完成'}
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
