const express = require('express');
const router = express.Router();
const { Employee, Attendance, Leave, Payroll, Department } = require('../models');

// ============ 员工管理 ============

// 获取所有员工
router.get('/employees', async (req, res) => {
  try {
    const { department, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (status) filter.status = status;
    
    const employees = await Employee.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Employee.countDocuments(filter);
    
    res.json({
      success: true,
      data: employees,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取单个员工
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ success: false, message: '员工不存在' });
    }
    res.json({ success: true, data: employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 创建员工
router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ success: true, data: employee });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 更新员工
router.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ success: false, message: '员工不存在' });
    }
    res.json({ success: true, data: employee });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 删除员工
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ success: false, message: '员工不存在' });
    }
    res.json({ success: true, message: '员工已删除' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ 考勤管理 ============

// 获取考勤记录
router.get('/attendance', async (req, res) => {
  try {
    const { employeeId, startDate, endDate, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    const records = await Attendance.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });
    
    const total = await Attendance.countDocuments(filter);
    
    res.json({
      success: true,
      data: records,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 签到
router.post('/attendance/checkin', async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 检查今天是否已签到
    const existing = await Attendance.findOne({
      employeeId,
      date: { $gte: today }
    });
    
    if (existing) {
      return res.status(400).json({ success: false, message: '今日已签到' });
    }
    
    const record = new Attendance({
      employeeId,
      date: today,
      checkIn: new Date(),
      status: '正常'
    });
    
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 签退
router.post('/attendance/checkout', async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const record = await Attendance.findOne({
      employeeId,
      date: { $gte: today }
    });
    
    if (!record) {
      return res.status(400).json({ success: false, message: '今日未签到' });
    }
    
    if (record.checkOut) {
      return res.status(400).json({ success: false, message: '今日已签退' });
    }
    
    record.checkOut = new Date();
    // 计算工作时长
    const hours = (record.checkOut - record.checkIn) / (1000 * 60 * 60);
    record.hoursWorked = Math.round(hours * 10) / 10;
    
    await record.save();
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============ 请假管理 ============

// 获取请假申请
router.get('/leave', async (req, res) => {
  try {
    const { employeeId, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (status) filter.status = status;
    
    const leaves = await Leave.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Leave.countDocuments(filter);
    
    res.json({
      success: true,
      data: leaves,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 创建请假申请
router.post('/leave', async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ success: true, data: leave });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 审批请假
router.put('/leave/:id/approve', async (req, res) => {
  try {
    const { approver, remark } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { 
        status: '已批准', 
        approver, 
        approveTime: new Date(),
        remark 
      },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ success: false, message: '请假申请不存在' });
    }
    res.json({ success: true, data: leave });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============ 薪酬管理 ============

// 获取薪酬记录
router.get('/payroll', async (req, res) => {
  try {
    const { employeeId, month, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (month) filter.month = month;
    
    const payrolls = await Payroll.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ month: -1 });
    
    const total = await Payroll.countDocuments(filter);
    
    res.json({
      success: true,
      data: payrolls,
      pagination: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 创建薪酬记录
router.post('/payroll', async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();
    res.status(201).json({ success: true, data: payroll });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============ 部门管理 ============

// 获取所有部门
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find().sort({ code: 1 });
    res.json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 创建部门
router.post('/departments', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json({ success: true, data: department });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============ 统计报表 ============

// 员工统计
router.get('/stats/employees', async (req, res) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: '在职' });
    const probation = await Employee.countDocuments({ status: '试用期' });
    const resigned = await Employee.countDocuments({ status: '离职' });
    
    // 按部门统计
    const byDepartment = await Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        active,
        probation,
        resigned,
        byDepartment
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
