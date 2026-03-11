import { API_BASE_URL } from '@/config/site';

async function getStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats/employees`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const statsData = await getStats();
  const stats = statsData?.data || { total: 0, active: 0, probation: 0, resigned: 0, byDepartment: [] };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">仪表盘</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-slate-500 mb-1">员工总数</div>
          <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-slate-500 mb-1">在职员工</div>
          <div className="text-3xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-slate-500 mb-1">试用期</div>
          <div className="text-3xl font-bold text-yellow-600">{stats.probation}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-slate-500 mb-1">已离职</div>
          <div className="text-3xl font-bold text-red-600">{stats.resigned}</div>
        </div>
      </div>

      {/* 部门分布 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">部门人员分布</h2>
        {stats.byDepartment && stats.byDepartment.length > 0 ? (
          <div className="space-y-3">
            {stats.byDepartment.map((dept: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-600">{dept._id || '未分配'}</span>
                <div className="flex items-center">
                  <div className="w-48 bg-slate-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(dept.count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{dept.count} 人</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">暂无数据</p>
        )}
      </div>

      {/* 快捷操作 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/employees" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 text-center transition">
          <div className="text-xl font-semibold mb-1">员工管理</div>
          <div className="text-blue-100 text-sm">查看和添加员工信息</div>
        </a>
        <a href="/attendance" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 text-center transition">
          <div className="text-xl font-semibold mb-1">考勤打卡</div>
          <div className="text-green-100 text-sm">员工签到签退</div>
        </a>
        <a href="/leave" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-6 text-center transition">
          <div className="text-xl font-semibold mb-1">请假审批</div>
          <div className="text-purple-100 text-sm">管理请假申请</div>
        </a>
      </div>
    </div>
  );
}
