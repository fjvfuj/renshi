'use client';
import { useState } from 'react';

interface Asset {
  id: string;
  name: string;
  category: string;
  status: 'normal' | 'maintenance' | 'scrapped';
  user: string;
}

export default function AssetsPage() {
  const [data] = useState<Asset[]>([
    { id: '1', name: 'MacBook Pro 16寸', category: '电子设备', status: 'normal', user: '张三' },
    { id: '2', name: 'iPhone 15 Pro', category: '电子设备', status: 'normal', user: '李四' },
    { id: '3', name: 'Dell显示器 27寸', category: '电子设备', status: 'maintenance', user: '-' },
    { id: '4', name: '办公椅', category: '办公家具', status: 'normal', user: '王五' },
    { id: '5', name: '投影仪', category: '办公设备', status: 'normal', user: '会议室A' },
    { id: '6', name: '旧打印机', category: '办公设备', status: 'scrapped', user: '-' },
  ]);

  const getStatus = (s: string) => {
    switch(s) {
      case 'normal': return { text: '正常使用', bg: '#dcfce7', color: '#16a34a' };
      case 'maintenance': return { text: '维修中', bg: '#fef3c7', color: '#d97706' };
      case 'scrapped': return { text: '已报废', bg: '#f3f4f6', color: '#6b7280' };
      default: return {};
    }
  };

  const getCategoryIcon = (c: string) => {
    if (c.includes('电子')) return '💻';
    if (c.includes('家具')) return '🪑';
    return '📷';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>资产管理</span>
        </div>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ 添加资产</button>
      </header>

      <main style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '资产总数', count: data.length, icon: '📦' },
            { label: '正常使用', count: data.filter(d => d.status === 'normal').length, icon: '✅' },
            { label: '维修中', count: data.filter(d => d.status === 'maintenance').length, icon: '🔧' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{item.icon} {item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937' }}>{item.count}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>资产列表</h2>
          {data.map(item => {
            const s = getStatus(item.status);
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{getCategoryIcon(item.category)}</span>
                  <div>
                    <p style={{ fontWeight: 500, color: '#1f2937', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{item.category}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>👤 {item.user}</span>
                  <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', backgroundColor: s.bg, color: s.color }}>
                    {s.text}
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
