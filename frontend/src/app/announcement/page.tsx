'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  important: boolean;
}

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', important: false });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    // 模拟数据
    setAnnouncements([
      { _id: '1', title: '📢 清明节放假通知', content: '2026年清明节放假安排...', author: '人事部', createdAt: '2026-03-11', important: true },
      { _id: '2', title: '📋 本周会议安排', content: '周一至周五各部门例会...', author: '行政部', createdAt: '2026-03-10', important: false },
      { _id: '3', title: '🎉 公司团建活动', content: '本月团建活动定于周末...', author: '工会', createdAt: '2026-03-09', important: false },
    ]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
            📢 通知公告
          </h1>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            + 发布公告
          </button>
        </div>

        {/* 重要公告 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#f5576c', fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔥 重要通知
          </h2>
          {announcements.filter(a => a.important).map(item => (
            <div key={item._id} style={{
              background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '15px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(245, 87, 108, 0.3)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ opacity: 0.9, marginBottom: '10px' }}>{item.content}</p>
              <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>发布人: {item.author} | {item.createdAt}</p>
            </div>
          ))}
        </div>

        {/* 普通公告 */}
        <div>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '15px' }}>
            📋 所有公告
          </h2>
          {announcements.map(item => (
            <div key={item._id} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '15px',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ opacity: 0.8, marginBottom: '10px' }}>{item.content}</p>
              <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>发布人: {item.author} | {item.createdAt}</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>发布公告</h2>
            <input 
              type="text" 
              placeholder="公告标题" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '15px' }}
            />
            <textarea 
              placeholder="公告内容" 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px', marginBottom: '15px' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <input 
                type="checkbox" 
                checked={formData.important}
                onChange={e => setFormData({...formData, important: e.target.checked})}
              />
              设为重要通知
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#e2e8f0', cursor: 'pointer' }}
              >
                取消
              </button>
              <button 
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', cursor: 'pointer' }}
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
