import IncomeModel from '../models/incomeSchema.js'

const addIncome = async (req, res) =>{

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
        
        const newIncome = new IncomeModel ({ 
            userId, 
            title, 
            amount,   
            category, 
            description, 
            date,
        });

            await newIncome.save()

            res.status(201).json({succes: true, message: "Income added successfully", data: newIncome})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}


const updateIncome = async (req, res) => {  
    const { id } = req.params;
    const { title, amount, income, category, description, date } = req.body;

    try{

        const incomeUpdate = await IncomeModel.findById(id)
        if(!incomeUpdate){
            return res.status(404).json({succes: false, message: "Income not found"})
        }

        incomeUpdate.title = title || incomeUpdate.title
        incomeUpdate.amount = amount || incomeUpdate.amount
        incomeUpdate.category = category || incomeUpdate.category
        incomeUpdate.description = description || incomeUpdate.description
        incomeUpdate.date = date || incomeUpdate.date

        await incomeUpdate.save()

        res.status(200).json({succes: true, message: "Income updated successfully", data: incomeUpdate})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try{

        const deleteIncome = await IncomeModel.findByIdAndDelete(id)
        if(!deleteIncome){
            return res.status(404).json({succes: false, message: "Income not found"})
        }

        res.status(200).json({succes: true, message: "Income deleted successfully", data: deleteIncome})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

const getIncome = async (req, res) => {

    try {
        const userId = req.user?.userId
        const getIncome = await IncomeModel.find({ userId: userId })
        if(!getIncome){
            return res.status(404).json({succes: false, message: "Income not found"})
        }

        res.status(200).json({succes: true, message: "Income retrieved successfully", data: getIncome})

    }catch (error) {
        console.log(error)
        res.status(500).json({succes: false, message: "Internal Server Error"})
    }
}

export { addIncome, deleteIncome, updateIncome, getIncome }