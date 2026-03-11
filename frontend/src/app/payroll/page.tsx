'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface Payroll {
  _id: string;
  employeeId: string;
  month: string;
  baseSalary: number;
  overtimePay: number;
  bonus: number;
  socialSecurity: number;
  housingFund: number;
  incomeTax: number;
  netSalary: number;
  status: string;
}

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '', month: '', baseSalary: 0, overtimePay: 0, bonus: 0, socialSecurity: 0, housingFund: 0, incomeTax: 0
  });

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await fetch(`${API_URL}/payroll`);
      const data = await res.json();
      if (data.success) {
        setPayrolls(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch payroll:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const netSalary = formData.baseSalary + formData.overtimePay + formData.bonus - formData.socialSecurity - formData.housingFund - formData.incomeTax;
    const dataWithNet = { ...formData, netSalary };
    try {
      const res = await fetch(`${API_URL}/payroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataWithNet)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ employeeId: '', month: '', baseSalary: 0, overtimePay: 0, bonus: 0, socialSecurity: 0, housingFund: 0, incomeTax: 0 });
        fetchPayrolls();
      }
    } catch (err) {
      console.error('Failed to create payroll:', err);
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
            薪酬管理
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
            + 发放工资
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
                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>工号</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>月份</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>基本工资</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>加班费</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>奖金</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>社保</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>公积金</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>个税</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>实发工资</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>状态</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e2e8f0' }}>
              {payrolls.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>{p.employeeId}</td>
                  <td style={{ padding: '12px' }}>{p.month}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.baseSalary}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.overtimePay}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.bonus}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.socialSecurity}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.housingFund}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>¥{p.incomeTax}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#48bb78' }}>¥{p.netSalary}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.65rem',
                      backgroundColor: p.status === '已发放' ? '#f0fff4' : '#fffff0',
                      color: p.status === '已发放' ? '#48bb78' : '#d69e2e'
                    }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {payrolls.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                    暂无记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>发放工资</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="工号" required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              <input type="month" required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" placeholder="基本工资" required value={formData.baseSalary} onChange={e => setFormData({...formData, baseSalary: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                <input type="number" placeholder="加班费" value={formData.overtimePay} onChange={e => setFormData({...formData, overtimePay: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" placeholder="奖金" value={formData.bonus} onChange={e => setFormData({...formData, bonus: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                <input type="number" placeholder="社保" value={formData.socialSecurity} onChange={e => setFormData({...formData, socialSecurity: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" placeholder="公积金" value={formData.housingFund} onChange={e => setFormData({...formData, housingFund: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                <input type="number" placeholder="个税" value={formData.incomeTax} onChange={e => setFormData({...formData, incomeTax: parseFloat(e.target.value)})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, backgroundColor: '#667eea', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>保存</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#4a5568', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
