'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Attendance {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  hoursWorked: number;
}

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch(`${API_URL}/attendance`);
      const data = await res.json();
      if (data.success) {
        setRecords(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
    }
  };

  const handleCheckIn = async () => {
    if (!employeeId) return setMessage('请输入工号');
    try {
      const res = await fetch(`${API_URL}/attendance/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId })
      });
      const data = await res.json();
      setMessage(data.success ? '签到成功！🎉' : data.message);
      if (data.success) fetchRecords();
    } catch (err) {
      setMessage('签到失败');
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) return setMessage('请输入工号');
    try {
      const res = await fetch(`${API_URL}/attendance/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId })
      });
      const data = await res.json();
      setMessage(data.success ? '签退成功！✅' : data.message);
      if (data.success) fetchRecords();
    } catch (err) {
      setMessage('签退失败');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '30px' }}>
          考勤管理
        </h1>

        {/* 打卡区域 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>每日打卡</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="请输入工号"
              value={employeeId}
              onChange={e => setEmployeeId(e.target.value)}
              style={{
                flex: 1,
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />
            <button 
              onClick={handleCheckIn} 
              style={{
                backgroundColor: '#48bb78',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              签到
            </button>
            <button 
              onClick={handleCheckOut} 
              style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              签退
            </button>
          </div>
          {message && (
            <p style={{ marginTop: '15px', textAlign: 'center', color: '#48bb78', fontWeight: 'bold' }}>
              {message}
            </p>
          )}
        </div>

        {/* 考勤记录 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f7fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>工号</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>日期</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>签到时间</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>签退时间</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>工作时长</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>状态</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e2e8f0' }}>
              {records.map((record) => (
                <tr key={record._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px' }}>{record.employeeId}</td>
                  <td style={{ padding: '16px' }}>{new Date(record.date).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</td>
                  <td style={{ padding: '16px' }}>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</td>
                  <td style={{ padding: '16px' }}>{record.hoursWorked || 0} 小时</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      backgroundColor: record.status === '正常' ? '#f0fff4' : '#fffff0',
                      color: record.status === '正常' ? '#48bb78' : '#d69e2e'
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                    暂无记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
