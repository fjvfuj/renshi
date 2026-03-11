const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 获取所有员工
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建新员工
router.post('/', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 获取单个员工
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// 更新员工
router.patch('/:id', getEmployee, async (req, res) => {
  Object.assign(res.employee, req.body);
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除员工
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.deleteOne();
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 中间件：根据 ID 获取员工
async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

module.exports = router;