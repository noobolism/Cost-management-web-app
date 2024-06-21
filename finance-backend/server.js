// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/finance', {
  useNewUrlParser: true, // حذف این گزینه‌ها چون deprecated شده‌اند
  useUnifiedTopology: true // حذف این گزینه‌ها چون deprecated شده‌اند
});

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

app.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.send(expense);
});

app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.send(expenses);
});

app.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.send({ message: 'Expense deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
