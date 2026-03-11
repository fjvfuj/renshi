import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人事管理系统",
  description: "现代化的人事管理解决方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-slate-800">人事管理系统</h1>
                <div className="ml-10 flex space-x-8">
                  <a href="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">仪表盘</a>
                  <a href="/employees" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">员工</a>
                  <a href="/attendance" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">考勤</a>
                  <a href="/leave" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">请假</a>
                  <a href="/payroll" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">薪酬</a>
                  <a href="/departments" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">部门</a>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-slate-500">Admin</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
