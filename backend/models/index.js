const mongoose = require('mongoose');

// 员工 Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true, index: true },
  position: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  idCard: { type: String }, // 身份证号
  entryDate: { type: Date, required: true },
  status: { type: String, enum: ['在职', '试用期', '离职', '停薪留职'], default: '试用期', index: true },
  salary: { type: Number, default: 0 },
  socialSecurityNo: { type: String }, // 社保账号
  bankAccount: { type: String }, // 银行账户
  emergencyContact: { type: String }, // 紧急联系人
  emergencyPhone: { type: String }, // 紧急联系人电话
  education: { type: String }, // 学历
  address: { type: String }, // 地址
  remark: { type: String }, // 备注
}, { timestamps: true });

// 考勤记录 Schema
const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  checkIn: { type: Date }, // 签到时间
  checkOut: { type: Date }, // 签退时间
  status: { type: String, enum: ['正常', '迟到', '早退', '缺勤', '请假', '加班'], default: '正常' },
  hoursWorked: { type: Number, default: 0 }, // 工作时长
  overtimeHours: { type: Number, default: 0 }, // 加班时长
  leaveType: { type: String }, // 请假类型
  leaveHours: { type: Number, default: 0 }, // 请假时长
  remark: { type: String },
}, { timestamps: true });

// 请假申请 Schema
const leaveSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, index: true },
  leaveType: { type: String, enum: ['年假', '病假', '事假', '婚假', '产假', '丧假', '其他'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  reason: { type: String },
  status: { type: String, enum: ['待审批', '已批准', '已拒绝'], default: '待审批', index: true },
  approver: { type: String }, // 审批人
  approveTime: { type: Date }, // 审批时间
  remark: { type: String },
}, { timestamps: true });

// 薪酬记录 Schema
const payrollSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, index: true },
  month: { type: String, required: true }, // 格式: 2024-01
  baseSalary: { type: Number, required: true },
  overtimePay: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
  allowance: { type: Number, default: 0 }, // 补贴
  deduction: { type: Number, default: 0 }, // 扣款
  socialSecurity: { type: Number, default: 0 }, // 社保
  housingFund: { type: Number, default: 0 }, // 公积金
  incomeTax: { type: Number, default: 0 }, // 个税
  netSalary: { type: Number, required: true }, // 实发工资
  status: { type: String, enum: ['待发放', '已发放'], default: '待发放' },
  payDate: { type: Date },
  remark: { type: String },
}, { timestamps: true });

// 部门 Schema
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  parentId: { type: String }, // 上级部门
  manager: { type: String }, // 部门负责人
  description: { type: String },
}, { timestamps: true });

module.exports = {
  Employee: mongoose.model('Employee', employeeSchema),
  Attendance: mongoose.model('Attendance', attendanceSchema),
  Leave: mongoose.model('Leave', leaveSchema),
  Payroll: mongoose.model('Payroll', payrollSchema),
  Department: mongoose.model('Department', departmentSchema)
};
