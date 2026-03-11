'use client';
import { useState } from 'react';

interface Workflow {
  _id: string;
  title: string;
  type: string;
  applicant: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export default function WorkflowPage() {
  const [workflows] = useState<Workflow[]>([
    { _id: '1', title: '请假申请 - 张三', type: '请假', applicant: '张三', status: 'pending', date: '2026-03-11' },
    { _id: '2', title: '采购申请 - 办公用品', type: '采购', applicant: '李四', status: 'approved', date: '2026-03-10' },
    { _id: '3', title: '报销申请 - 差旅费', type: '报销', applicant: '王五', status: 'pending', date: '2026-03-11' },
    { _id: '4', title: '加班申请 - 项目赶工', type: '加班', applicant: '赵六', status: 'approved', date: '2026-03-09' },
    { _id: '5', title: '离职申请 - 员工张三', type: '离职', applicant: '人事部', status: 'rejected', date: '2026-03-08' },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return { bg: '#fff3cd', color: '#856404' };
      case 'approved': return { bg: '#d4edda', color: '#155724' };
      case 'rejected': return { bg: '#f8d7da', color: '#721c24' };
      default: return { bg: '#e2e8f0', color: '#4a5568' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case '请假': return '📝';
      case '采购': return '🛒';
      case '报销': return '💰';
      case '加班': return '⏰';
      case '离职': return '👋';
      default: return '📄';
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
            🔄 审批流程
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
            + 新建审批
          </button>
        </div>

        {/* 统计 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(255,243,205,0.2)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,243,205,0.3)' }}>
            <p style={{ color: '#ffc107', margin: 0 }}>待审批</p>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', margin: '10px 0 0' }}>
              {workflows.filter(w => w.status === 'pending').length}
            </p>
          </div>
          <div style={{ background: 'rgba(212,237,218,0.2)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(212,237,218,0.3)' }}>
            <p style={{ color: '#28a745', margin: 0 }}>已通过</p>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', margin: '10px 0 0' }}>
              {workflows.filter(w => w.status === 'approved').length}
            </p>
          </div>
          <div style={{ background: 'rgba(248,215,218,0.2)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(248,215,218,0.3)' }}>
            <p style={{ color: '#dc3545', margin: 0 }}>已拒绝</p>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', margin: '10px 0 0' }}>
              {workflows.filter(w => w.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* 审批列表 */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '20px' }}>📋 审批列表</h2>
          {workflows.map(item => {
            const statusStyle = getStatusColor(item.status);
            return (
              <div key={item._id} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(item.type)}</span>
                  <div>
                    <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>{item.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '5px 0 0' }}>
                      申请人: {item.applicant} | {item.date}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    background: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {item.status === 'pending' ? '待审批' : item.status === 'approved' ? '已通过' : '已拒绝'}
                  </span>
                  {item.status === 'pending' && (
                    <>
                      <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' }}>通过</button>
                      <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer' }}>拒绝</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
