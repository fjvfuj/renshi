'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Employee {
  _id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  entryDate: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', employeeId: '', department: '', position: '', phone: '', email: '', entryDate: '', status: '试用期'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/employees`);
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ name: '', employeeId: '', department: '', position: '', phone: '', email: '', entryDate: '', status: '试用期' });
        fetchEmployees();
      }
    } catch (err) {
      console.error('Failed to create employee:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除该员工吗？')) return;
    try {
      await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  const statusColors: any = {
    '在职': { bg: '#f0fff4', text: '#48bb78', border: '#48bb78' },
    '试用期': { bg: '#fffff0', text: '#d69e2e', border: '#d69e2e' },
    '离职': { bg: '#fff5f5', text: '#e53e3e', border: '#e53e3e' }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white',
            margin: 0
          }}>
            员工管理
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
            + 添加员工
          </button>
        </div>

        {/* 数据表格 */}
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
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>姓名</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>部门</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>职位</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>状态</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>入职日期</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e2e8f0' }}>
              {employees.map((emp) => (
                <tr key={emp._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px' }}>{emp.employeeId}</td>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{emp.name}</td>
                  <td style={{ padding: '16px' }}>{emp.department}</td>
                  <td style={{ padding: '16px' }}>{emp.position}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      backgroundColor: statusColors[emp.status]?.bg || '#f7fafc',
                      color: statusColors[emp.status]?.text || '#718096',
                      border: `1px solid ${statusColors[emp.status]?.border || '#e2e8f0'}`
                    }}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>{new Date(emp.entryDate).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      onClick={() => handleDelete(emp._id)} 
                      style={{ 
                        color: '#e53e3e', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 模态框 */}
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>添加员工</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="姓名" 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="工号" 
                required 
                value={formData.employeeId} 
                onChange={e => setFormData({...formData, employeeId: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="部门" 
                required 
                value={formData.department} 
                onChange={e => setFormData({...formData, department: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="职位" 
                required 
                value={formData.position} 
                onChange={e => setFormData({...formData, position: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="电话" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="email" 
                placeholder="邮箱" 
                required 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="date" 
                required 
                value={formData.entryDate} 
                onChange={e => setFormData({...formData, entryDate: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="submit" 
                  style={{
                    flex: 1,
                    backgroundColor: '#667eea',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  保存
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#e2e8f0',
                    color: '#4a5568',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
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
