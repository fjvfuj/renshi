'use client';
import { useState } from 'react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  status: 'interview' | 'offer' | 'hired' | 'rejected';
  date: string;
}

export default function RecruitmentPage() {
  const [candidates] = useState<Candidate[]>([
    { id: '1', name: '陈一', position: '前端工程师', status: 'interview', date: '2026-03-10' },
    { id: '2', name: '周八', position: '后端工程师', status: 'offer', date: '2026-03-08' },
    { id: '3', name: '吴九', position: '产品经理', status: 'interview', date: '2026-03-11' },
    { id: '4', name: '郑十', position: 'UI设计师', status: 'hired', date: '2026-03-05' },
    { id: '5', name: '孙二', position: '测试工程师', status: 'rejected', date: '2026-03-06' },
  ]);

  const getStatusText = (s: string) => {
    switch(s) {
      case 'interview': return '面试中';
      case 'offer': return '已发放Offer';
      case 'hired': return '已入职';
      case 'rejected': return '已拒绝';
      default: return s;
    }
  };

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'interview': return { bg: '#dbeafe', color: '#2563eb' };
      case 'offer': return { bg: '#fef3c7', color: '#d97706' };
      case 'hired': return { bg: '#dcfce7', color: '#16a34a' };
      case 'rejected': return { bg: '#f3f4f6', color: '#6b7280' };
      default: return {};
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>招聘管理</span>
        </div>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ 发布职位</button>
      </header>

      <main style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '面试中', count: candidates.filter(c => c.status === 'interview').length, icon: '👤' },
            { label: '待发放Offer', count: candidates.filter(c => c.status === 'offer').length, icon: '📝' },
            { label: '已入职', count: candidates.filter(c => c.status === 'hired').length, icon: '✅' },
            { label: '已拒绝', count: candidates.filter(c => c.status === 'rejected').length, icon: '❌' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{item.icon} {item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937' }}>{item.count}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>候选人列表</h2>
          {candidates.map(c => {
            const c2 = getStatusColor(c.status);
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <p style={{ fontWeight: 500, color: '#1f2937', marginBottom: '4px' }}>{c.name}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>{c.position} · {c.date}</p>
                </div>
                <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', backgroundColor: c2.bg, color: c2.color }}>
                  {getStatusText(c.status)}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
