'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* 顶部导航 */}
      <header style={{ backgroundColor: 'white', padding: '16px 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>HR</div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>系统设置</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#6b7280', fontSize: '14px' }}>Admin</span>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#e5e7eb', borderRadius: '50%' }}></div>
        </div>
      </header>

      <div style={{ display: 'flex', padding: '24px 32px', gap: '24px' }}>
        {/* 侧边栏 */}
        <aside style={{ width: '240px', backgroundColor: 'white', borderRadius: '12px', padding: '16px', height: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {['profile', 'account', 'security', 'notification', 'appearance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#eff6ff' : 'transparent',
                color: activeTab === tab ? '#2563eb' : '#4b5563',
                borderRadius: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>{tab === 'profile' ? '👤' : tab === 'account' ? '🏢' : tab === 'security' ? '🔒' : tab === 'notification' ? '🔔' : '🎨'}</span>
              {tab === 'profile' ? '个人资料' : tab === 'account' ? '账号设置' : tab === 'security' ? '安全设置' : tab === 'notification' ? '通知设置' : '外观设置'}
            </button>
          ))}
        </aside>

        {/* 主内容 */}
        <main style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {activeTab === 'profile' && (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>个人资料</h2>
              <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>用户名</label>
                  <input type="text" defaultValue="admin" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>显示名称</label>
                  <input type="text" defaultValue="系统管理员" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>邮箱</label>
                  <input type="email" defaultValue="admin@company.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>手机号</label>
                  <input type="tel" defaultValue="138****8000" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                </div>
                <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', marginTop: '10px', width: 'fit-content' }}>保存修改</button>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>安全设置</h2>
              <div style={{ maxWidth: '500px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>登录密码</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>定期修改密码可以保护账号安全</p>
                  <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>修改密码</button>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>两步验证</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>为您的账号添加额外的安全保护</p>
                  <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>启用验证</button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notification' && (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>通知设置</h2>
              <div style={{ maxWidth: '500px' }}>
                {['系统通知', '邮件通知', '短信通知'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <div>
                      <p style={{ fontWeight: 500, color: '#1f2937' }}>{item}</p>
                      <p style={{ fontSize: '13px', color: '#6b7280' }}>{i === 0 ? '接收系统推送通知' : i === 1 ? '接收邮件通知' : '接收短信通知'}</p>
                    </div>
                    <div style={{ width: '44px', height: '24px', backgroundColor: '#2563eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>外观设置</h2>
              <div style={{ maxWidth: '500px' }}>
                <p style={{ fontWeight: 500, color: '#1f2937', marginBottom: '12px' }}>主题模式</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['light', 'dark', 'auto'].map((theme) => (
                    <div key={theme} style={{ 
                      padding: '16px 24px', 
                      border: theme === 'light' ? '2px solid #2563eb' : '1px solid #e5e7eb', 
                      borderRadius: '8px', 
                      backgroundColor: theme === 'light' ? '#eff6ff' : 'white',
                      cursor: 'pointer'
                    }}>
                      <span style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}>{theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🔄'}</span>
                      <span style={{ fontSize: '14px', color: theme === 'light' ? '#2563eb' : '#4b5563' }}>{theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'account' && (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>账号设置</h2>
              <div style={{ maxWidth: '500px' }}>
                <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: 600, color: '#dc2626', marginBottom: '8px' }}>⚠️ 危险操作</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>删除账号后，所有数据将被永久清除且无法恢复</p>
                  <button style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>删除账号</button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
