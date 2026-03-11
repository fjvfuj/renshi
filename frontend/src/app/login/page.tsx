'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证 - 生产环境应该用JWT
    if (username === 'admin' && password === 'admin123') {
      // 登录成功，跳转到首页
      router.push('/');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
            人事管理系统
          </h1>
          <p style={{ color: '#718096' }}>请登录您的账号</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />
          </div>
          
          {error && (
            <p style={{ color: '#e53e3e', textAlign: 'center', margin: 0 }}>{error}</p>
          )}
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#667eea',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            登录
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#a0aec0', fontSize: '0.875rem' }}>
          默认账号: admin / admin123
        </div>
      </div>
    </div>
  );
}
