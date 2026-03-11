export const siteConfig = {
  name: "人事管理系统",
  description: "一个现代化的人事管理解决方案",
  
  navItems: [
    { label: "仪表盘", href: "/" },
    { label: "员工", href: "/employees" },
    { label: "考勤", href: "/attendance" },
    { label: "请假", href: "/leave" },
    { label: "薪酬", href: "/payroll" },
    { label: "部门", href: "/departments" },
  ],
  
  footer: {
    links: [
      { name: "GitHub", href: "https://github.com/fjvfuj/renshi" },
    ],
  }
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
