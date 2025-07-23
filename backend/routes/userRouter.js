import express from "express"
import { login, register } from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { addIncome, deleteIncome,getIncome, updateIncome } from "../controllers/incomeController.js"
import { addExpense, deleteExpense, getExpense, updateExpense } from "../controllers/expenseController.js";


const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

userRouter.post('/add-income', authMiddleware, addIncome)
userRouter.put('/update-income/:id', authMiddleware, updateIncome)
userRouter.delete('/delete-income/:id', deleteIncome)
userRouter.get('/get-income', authMiddleware, getIncome)


userRouter.post('/add-Expense', authMiddleware, addExpense)
userRouter.put('/update-Expense/:id', authMiddleware, updateExpense)
userRouter.delete('/delete-Expense/:id', deleteExpense)
userRouter.get('/get-Expense', authMiddleware, getExpense)


export default userRouter