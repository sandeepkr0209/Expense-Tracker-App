import ExpenseModel from '../models/expenseSchema.js'

const addExpense = async (req, res) =>{

    const userId = req.user?.userId

    const {title, amount, category, description, date } = req.body;

    const parsedAmount = Number(amount)

    try {

        if( !title || !amount || !category || !description || !date ){
            return res.status(400).json({succes: false, message: "Please provide all required fields"})
        }

        if(isNaN(parsedAmount) || parsedAmount <= 0){
            return res.status(400).json({succes: false, message: "Amount must be a positive number"})
        }
        
        const newExpense = new ExpenseModel ({ 
            userId, 
            title, 
            amount,   
            category, 
            description, 
            date,
        });

            await newExpense.save()

            res.status(201).json({succes: true, message: "Expense added successfully", data: newExpense})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}


const updateExpense = async (req, res) => {  
    const { id } = req.params;
    const { title, amount, Expense, category, description, date } = req.body;

    try{

        const ExpenseUpdate = await ExpenseModel.findById(id)
        if(!ExpenseUpdate){
            return res.status(404).json({succes: false, message: "Expense not found"})
        }

        ExpenseUpdate.title = title || ExpenseUpdate.title
        ExpenseUpdate.amount = amount || ExpenseUpdate.amount
        ExpenseUpdate.category = category || ExpenseUpdate.category
        ExpenseUpdate.description = description || ExpenseUpdate.description
        ExpenseUpdate.date = date || ExpenseUpdate.date

        await ExpenseUpdate.save()

        res.status(200).json({succes: true, message: "Expense updated successfully", data: ExpenseUpdate})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try{

        const deleteExpense = await ExpenseModel.findByIdAndDelete(id)
        if(!deleteExpense){
            return res.status(404).json({succes: false, message: "Expense not found"})
        }

        res.status(200).json({succes: true, message: "Expense deleted successfully", data: deleteExpense})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

const getExpense = async (req, res) => {

    try {
        const userId = req.user?.userId
        const getExpense = await ExpenseModel.find({ userId: userId })
        if(!getExpense){
            return res.status(404).json({succes: false, message: "Expense not found"})
        }

        res.status(200).json({succes: true, message: "Expense retrieved successfully", data: getExpense})

    }catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

export { addExpense, deleteExpense, updateExpense, getExpense }