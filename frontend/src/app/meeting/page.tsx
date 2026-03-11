'use client';
import { useState } from 'react';

interface Meeting {
  _id: string;
  title: string;
  room: string;
  time: string;
  host: string;
  participants: string[];
  status: 'upcoming' | 'ongoing' | 'ended';
}

export default function MeetingPage() {
  const [meetings] = useState<Meeting[]>([
    { _id: '1', title: '周例会', room: '会议室A', time: '14:00-16:00', host: '张三', participants: ['全体'], status: 'upcoming' },
    { _id: '2', title: '项目评审', room: '会议室B', time: '10:00-11:30', host: '李四', participants: ['技术部'], status: 'ended' },
    { _id: '3', title: '产品规划', room: '会议室A', time: '15:00-17:00', host: '王五', participants: ['产品部', '研发部'], status: 'ongoing' },
  ]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming': return { text: '即将开始', bg: '#fff3cd', color: '#856404' };
      case 'ongoing': return { text: '进行中', bg: '#d4edda', color: '#155724' };
      case 'ended': return { text: '已结束', bg: '#e2e8f0', color: '#4a5568' };
      default: return { text: '', bg: '', color: '' };
    }
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
            📅 会议管理
          </h1>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            + 预约会议
          </button>
        </div>

        {/* 会议列表 */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {meetings.map(meeting => {
            const badge = getStatusBadge(meeting.status);
            return (
              <div key={meeting._id} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '25px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>{meeting.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 5px 0' }}>🕐 {meeting.time}</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 5px 0' }}>📍 {meeting.room}</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>👤 主持人: {meeting.host}</p>
                  </div>
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    background: badge.bg,
                    color: badge.color
                  }}>
                    {badge.text}
                  </span>
                </div>
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.9rem' }}>
                    👥 参会人: {meeting.participants.join(', ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
