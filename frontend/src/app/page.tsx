'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  departments: number;
  todayAttendance: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: 0,
    todayAttendance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const empRes = await fetch(`${API_URL}/stats/employees`);
      const empData = await empRes.json();
      
      const deptRes = await fetch(`${API_URL}/departments`);
      const deptData = await deptRes.json();

      const today = new Date().toISOString().split('T')[0];
      const attRes = await fetch(`${API_URL}/attendance?startDate=${today}&endDate=${today}`);
      const attData = await attRes.json();

      setStats({
        totalEmployees: empData?.data?.total || 0,
        activeEmployees: empData?.data?.active || 0,
        departments: deptData?.data?.length || 0,
        todayAttendance: attData?.data?.length || 0
      });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
  };

  const currentHour = new Date().getHours();
  let greeting = '你好';
  if (currentHour < 6) greeting = '夜深了';
  else if (currentHour < 12) greeting = '早上好';
  else if (currentHour < 14) greeting = '中午好';
  else if (currentHour < 18) greeting = '下午好';
  else greeting = '晚上好';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* 顶部导航 */}
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>人事管理系统</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#6b7280', fontSize: '14px' }}>{greeting}，Admin</span>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#6b7280' }}>👤</span>
          </div>
        </div>
      </header>

      <main style={{ padding: '24px 32px' }}>
        {/* 欢迎区域 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>{greeting}！</h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>欢迎回到工作台，今天也是充实的一天 💪</p>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>{new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* 统计卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
          {[
            { label: '员工总数', value: stats.totalEmployees, icon: '👥', color: '#2563eb', bg: '#eff6ff' },
            { label: '在职员工', value: stats.activeEmployees, icon: '✅', color: '#10b981', bg: '#ecfdf5' },
            { label: '部门数量', value: stats.departments, icon: '🏢', color: '#8b5cf6', bg: '#f5f3ff' },
            { label: '今日考勤', value: stats.todayAttendance, icon: '📋', color: '#f59e0b', bg: '#fffbeb' },
          ].map((item, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontSize: '32px', fontWeight: 700, color: item.color }}>{loading ? '...' : item.value}</p>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 功能模块 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>快捷入口</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {[
              { icon: '👨‍💼', title: '员工管理', desc: '员工档案', href: '/employees', color: '#2563eb' },
              { icon: '📋', title: '考勤打卡', desc: '签到签退', href: '/attendance', color: '#10b981' },
              { icon: '📝', title: '请假审批', desc: '请假申请', href: '/leave', color: '#8b5cf6' },
              { icon: '💰', title: '薪酬管理', desc: '工资发放', href: '/payroll', color: '#f59e0b' },
              { icon: '🏢', title: '部门管理', desc: '组织架构', href: '/departments', color: '#ec4899' },
            ].map((item, index) => (
              <a key={index} href={item.href} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '20px', 
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'block',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: item.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 第二行功能 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {[
            { icon: '📢', title: '通知公告', desc: '公司通知', href: '/announcement', color: '#ef4444' },
            { icon: '🔄', title: '审批流程', desc: '待办审批', href: '/workflow', color: '#06b6d4' },
            { icon: '📅', title: '会议管理', desc: '会议室', href: '/meeting', color: '#84cc16' },
            { icon: '📁', title: '文档管理', desc: '公司文档', href: '/documents', color: '#6366f1' },
            { icon: '⚙️', title: '系统设置', desc: '系统配置', href: '/settings', color: '#64748b' },
          ].map((item, index) => (
            <a key={index} href={item.href} style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '20px', 
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'block',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: item.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>
                {item.icon}
              </div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>{item.title}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
