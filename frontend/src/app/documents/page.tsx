'use client';
import { useState } from 'react';

interface Doc {
  _id: string;
  name: string;
  type: string;
  size: string;
  uploader: string;
  date: string;
}

export default function DocumentsPage() {
  const [documents] = useState<Doc[]>([
    { _id: '1', name: '📄 人事管理制度2026.pdf', type: 'PDF', size: '2.5MB', uploader: '张三', date: '2026-03-10' },
    { _id: '2', name: '📊 考勤统计表.xlsx', type: 'Excel', size: '1.2MB', uploader: '李四', date: '2026-03-09' },
    { _id: '3', name: '📝 员工手册.docx', type: 'Word', size: '800KB', uploader: '王五', date: '2026-03-08' },
    { _id: '4', name: '📁 项目计划书.pdf', type: 'PDF', size: '5.3MB', uploader: '赵六', date: '2026-03-07' },
    { _id: '5', name: '🖼️ 公司介绍PPT.pptx', type: 'PPT', size: '15MB', uploader: '行政部', date: '2026-03-05' },
  ]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'Excel': return '📊';
      case 'Word': return '📝';
      case 'PPT': return '🖼️';
      default: return '📁';
    }
  };

  const getColor = (type: string) => {
    switch(type) {
      case 'PDF': return '#e53e3e';
      case 'Excel': return '#38a169';
      case 'Word': return '#3182ce';
      case 'PPT': return '#dd6b20';
      default: return '#718096';
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
            📁 文档管理
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
            ↑ 上传文档
          </button>
        </div>

        {/* 文件夹 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {['全部文档', '我的上传', '共享文件', '最近访问'].map((folder, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📂</span>
              <p style={{ color: 'white', fontWeight: 'bold', margin: '10px 0 0' }}>{folder}</p>
            </div>
          ))}
        </div>

        {/* 文档列表 */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '20px' }}>📋 所有文档</h2>
          {documents.map(doc => (
            <div key={doc._id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>{getIcon(doc.type)}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>{doc.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '5px 0 0' }}>
                  {doc.uploader} · {doc.date}
                </p>
              </div>
              <span style={{ 
                padding: '5px 12px', 
                borderRadius: '15px', 
                background: getColor(doc.type) + '20',
                color: getColor(doc.type),
                fontSize: '0.8rem'
              }}>
                {doc.size}
              </span>
              <button style={{ 
                marginLeft: '15px',
                padding: '8px 16px', 
                borderRadius: '8px', 
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer'
              }}>
                下载
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
