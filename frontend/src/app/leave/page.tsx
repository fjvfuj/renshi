'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Leave {
  _id: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: string;
}

export default function LeavePage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '', leaveType: '年假', startDate: '', endDate: '', totalDays: 0, reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${API_URL}/leave`);
      const data = await res.json();
      if (data.success) {
        setLeaves(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch leaves:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ employeeId: '', leaveType: '年假', startDate: '', endDate: '', totalDays: 0, reason: '' });
        fetchLeaves();
      }
    } catch (err) {
      console.error('Failed to create leave:', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await fetch(`${API_URL}/leave/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approver: 'Admin' })
      });
      fetchLeaves();
    } catch (err) {
      console.error('Failed to approve leave:', err);
    }
  };

  const statusColors: any = {
    '已批准': { bg: '#f0fff4', text: '#48bb78' },
    '已拒绝': { bg: '#fff5f5', text: '#e53e3e' },
    '待审批': { bg: '#fffff0', text: '#d69e2e' }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
            请假管理
          </h1>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: 'white',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            + 申请请假
          </button>
        </div>

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
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>请假类型</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>开始日期</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>结束日期</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>天数</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>状态</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e2e8f0' }}>
              {leaves.map((leave) => (
                <tr key={leave._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px' }}>{leave.employeeId}</td>
                  <td style={{ padding: '16px' }}>{leave.leaveType}</td>
                  <td style={{ padding: '16px' }}>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{leave.totalDays} 天</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      backgroundColor: statusColors[leave.status]?.bg || '#f7fafc',
                      color: statusColors[leave.status]?.text || '#718096'
                    }}>
                      {leave.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {leave.status === '待审批' && (
                      <button 
                        onClick={() => handleApprove(leave._id)}
                        style={{ color: '#48bb78', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                      >
                        批准
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                    暂无记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '30px',
            width: '100%',
            maxWidth: '500px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>申请请假</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="工号" 
                required 
                value={formData.employeeId} 
                onChange={e => setFormData({...formData, employeeId: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <select 
                value={formData.leaveType} 
                onChange={e => setFormData({...formData, leaveType: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              >
                <option value="年假">年假</option>
                <option value="病假">病假</option>
                <option value="事假">事假</option>
                <option value="婚假">婚假</option>
                <option value="产假">产假</option>
              </select>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input 
                  type="date" 
                  required 
                  value={formData.startDate} 
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                />
                <input 
                  type="date" 
                  required 
                  value={formData.endDate} 
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <input 
                type="number" 
                placeholder="天数" 
                required 
                value={formData.totalDays} 
                onChange={e => setFormData({...formData, totalDays: parseFloat(e.target.value)})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <textarea 
                placeholder="请假原因" 
                value={formData.reason} 
                onChange={e => setFormData({...formData, reason: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '80px' }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="submit" 
                  style={{ flex: 1, backgroundColor: '#667eea', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  提交
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#4a5568', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
