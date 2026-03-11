const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  entryDate: { type: Date, required: true },
  status: { type: String, enum: ['在职', '离职', '试用'], default: '在职' },
  // 其他字段...
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);