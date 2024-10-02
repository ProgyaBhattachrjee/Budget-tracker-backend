const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, deleteIncome } = require('../controllers/income')

const router = require('express').Router()
 router.post('/add-income',addIncome).get('/get-income',getIncome).delete('/delete-income/:title', deleteIncome);
 router.post('/add-expense',addExpense).get('/get-expense',getExpense).delete('/delete-expense/:title',deleteExpense);
 module.exports = router