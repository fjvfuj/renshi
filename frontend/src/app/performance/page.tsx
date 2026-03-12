'use client';
import { useState } from 'react';

interface Performance {
  id: string;
  employee: string;
  department: string;
  quarter: string;
  score: number;
  rating: string;
}

export default function PerformancePage() {
  const [data] = useState<Performance[]>([
    { id: '1', employee: '张三', department: '技术部', quarter: 'Q1 2026', score: 92, rating: 'A' },
    { id: '2', employee: '李四', department: '技术部', quarter: 'Q1 2026', score: 88, rating: 'B' },
    { id: '3', employee: '王五', department: '销售部', quarter: 'Q1 2026', score: 95, rating: 'A' },
    { id: '4', employee: '赵六', department: '销售部', quarter: 'Q1 2026', score: 78, rating: 'C' },
    { id: '5', employee: '钱七', department: '财务部', quarter: 'Q1 2026', score: 90, rating: 'A' },
  ]);

  const getRatingColor = (r: string) => {
    switch(r) {
      case 'A': return { bg: '#dcfce7', color: '#16a34a' };
      case 'B': return { bg: '#dbeafe', color: '#2563eb' };
      case 'C': return { bg: '#fef3c7', color: '#d97706' };
      default: return {};
    }
  };

  const avgScore = Math.round(data.reduce((sum, d) => sum + d.score, 0) / data.length);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>绩效考核</span>
        </div>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ 发起考核</button>
      </header>

      <main style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '平均分', value: avgScore, icon: '📊' },
            { label: 'A级员工', value: data.filter(d => d.rating === 'A').length, icon: '⭐' },
            { label: 'B级员工', value: data.filter(d => d.rating === 'B').length, icon: '👍' },
            { label: 'C级员工', value: data.filter(d => d.rating === 'C').length, icon: '📈' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{item.icon} {item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>员工考核列表 - Q1 2026</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: 500, fontSize: '14px' }}>员工</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: 500, fontSize: '14px' }}>部门</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: 500, fontSize: '14px' }}>考核季度</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: 500, fontSize: '14px' }}>评分</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: 500, fontSize: '14px' }}>等级</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                const c = getRatingColor(item.rating);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 12px', color: '#1f2937', fontWeight: 500 }}>{item.employee}</td>
                    <td style={{ padding: '14px 12px', color: '#6b7280' }}>{item.department}</td>
                    <td style={{ padding: '14px 12px', color: '#6b7280' }}>{item.quarter}</td>
                    <td style={{ padding: '14px 12px', color: '#1f2937', fontWeight: 600 }}>{item.score}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, backgroundColor: c.bg, color: c.color }}>{item.rating}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
