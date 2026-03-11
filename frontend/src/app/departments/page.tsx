'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Department {
  _id: string;
  name: string;
  code: string;
  manager: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', manager: '', description: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_URL}/departments`);
      const data = await res.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ name: '', code: '', manager: '', description: '' });
        fetchDepartments();
      }
    } catch (err) {
      console.error('Failed to create department:', err);
    }
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
            部门管理
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
            + 添加部门
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {departments.map((dept) => (
            <div 
              key={dept._id} 
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '25px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>{dept.name}</h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  backgroundColor: '#ebf8ff',
                  color: '#667eea'
                }}>
                  {dept.code}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '10px' }}>
                负责人: {dept.manager || '-'}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                {dept.description || '暂无描述'}
              </p>
            </div>
          ))}
          {departments.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'white' }}>
              暂无部门
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>添加部门</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="部门名称" 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="部门编码" 
                required 
                value={formData.code} 
                onChange={e => setFormData({...formData, code: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <input 
                type="text" 
                placeholder="负责人" 
                value={formData.manager} 
                onChange={e => setFormData({...formData, manager: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
              />
              <textarea 
                placeholder="描述" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '80px' }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="submit" 
                  style={{ flex: 1, backgroundColor: '#667eea', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  保存
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
