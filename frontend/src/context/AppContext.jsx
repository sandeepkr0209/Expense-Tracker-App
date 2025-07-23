import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import cookie from "js-cookie"
import axios from "axios"
import { toast } from "react-toastify"
import {jwtDecode} from 'jwt-decode'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const navigate = useNavigate()

  const [ExpenseData, setExpenseData] = useState([])
  const [IncomeData, setIncomeData] = useState([])
  const [token, setToken] = useState(Boolean(cookie.get("token")))

  const backendUrl = "http://localhost:4000"

  const utoken = cookie.get("token")

  const fetchIncome = async () => {
  try {
    const utoken = cookie.get("token")  // ⬅ moved inside
    if (!utoken || typeof utoken !== "string") {
      console.warn("No token available to fetch income.");
      return;
    }

    const decodedToken = jwtDecode(utoken)
    const userId = decodedToken?.id
    if (!userId) return;

    const { data } = await axios.get(`${backendUrl}/api/user/get-income`, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    })

    if (data.success) {
      setIncomeData(data.data)
    }

  } catch (error) {
    console.log("Fetch Income failed: ", error)
  }
}


  const fetchExpense = async () => {
  try {
    const utoken = cookie.get("token")  // ⬅ moved inside
    if (!utoken || typeof utoken !== "string") {
      console.warn("No token available to fetch expense.");
      return;
    }

    const decodedToken = jwtDecode(utoken)
    const userId = decodedToken?.id
    if (!userId) return;

    const { data } = await axios.get(`${backendUrl}/api/user/get-expense`, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    })

    if (data.success) {
      setExpenseData(data.data)
    }

  } catch (error) {
    console.log("Fetch Expense failed: ", error)
  }
}


  const addIncome = async (title, amount, income, category, description, date) => {
    try{
      const utoken = cookie.get("token")
      const { data } = await axios.post(`${backendUrl}/api/user/add-income`, { title, amount, income, category, description, date }, {
        headers : {
          Authorization: `Bearer ${utoken}`
        }
      })

      if(data.success){
        toast.success(data.message)
        fetchIncome()
        navigate('/')
      }
    } catch(error){
      console.log("Add Income Error:",error)
    }
  }

 const addExpense = async (title, amount, expense, category, description, date) => {
  try {
    const utoken = cookie.get("token");
    if (!utoken) return toast.error("Unauthorized. Please log in again.");

    const { data } = await axios.post(`${backendUrl}/api/user/add-expense`, {
      title, amount, expense, category, description, date
    }, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    });

    if (data.success) {
      toast.success(data.message);
      fetchExpense();
      navigate('/');
    }
  } catch (error) {
    console.log("Add Expense Error:", error);
  }
}


  const deleteIncome = async (id) => {
  try {
    const utoken = cookie.get("token");
    const { data } = await axios.delete(`${backendUrl}/api/user/delete-income/${id}`, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    });

    if (data.success) {
      toast.success(data.message || "Income deleted");
      fetchIncome();
    }
  } catch (error) {
    console.error("Delete Income Error:", error);
    toast.error("Failed to delete income");
  }
}

  const deleteExpense = async (id) => {
  try {
    const utoken = cookie.get("token");
    const { data } = await axios.delete(`${backendUrl}/api/user/delete-expense/${id}`, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    });

    if (data.success) {
      toast.success(data.message || "Expense deleted");
      fetchExpense();
    }
  } catch (error) {
    console.error("Delete Expense Error:", error);
    toast.error("Failed to delete expense");
  }
};


  const updateIncome = async (id, updatedFields) => {
  try {
    const utoken = cookie.get("token");
    const { data } = await axios.put(`${backendUrl}/api/user/update-income/${id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    });

    if (data.success) {
      toast.success(data.message || "Income updated");
      fetchIncome();
    }
  } catch (error) {
    console.error("Update Income Error:", error);
    toast.error("Failed to update income");
  }
};


  const updateExpense = async (id, updatedFields) => {
  try {
    const utoken = cookie.get("token");
    const { data } = await axios.put(`${backendUrl}/api/user/update-expense/${id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${utoken}`
      }
    });

    if (data.success) {
      toast.success(data.message || "Expense updated");
      fetchExpense();
    }
  } catch (error) {
    console.error("Update Expense Error:", error);
    toast.error("Failed to update expense");
  }
};



  const handleRegister = async (name, email, password) => {
    try{

      const{ data } = await axios .post(`${backendUrl}/api/user/register`, {name, email, password},{
        headers:{
          "Context-Type": "application/json"
        }
      })

      if(data.success){
        cookie.set("token", data.token, { expires: 7})
        fetchIncome()
        fetchExpense()
        setToken(true)
        toast.success(data.message || "Register Successfull")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (email, password) => {
    try{

      const{ data } = await axios.post(`${backendUrl}/api/user/login`, {email, password},{
        headers:{
          "Context-Type": "application/json"
        }
      })

      if(data.success){
        console.log(data)
        cookie.set("token", data.token)
        setToken(true)
        fetchIncome()
        fetchExpense()
        toast.success(data.message || "Login Successfull")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(token){
      fetchIncome()
     fetchExpense()
    }
  }, [token, location.pathname])


  useEffect(() => {
    const token = cookie.get("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else{
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token])

  
  const values = {
    backendUrl,
    handleRegister,
    handleLogin,
    fetchIncome,
    fetchExpense,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    updateIncome,
    updateExpense,
    IncomeData,
    ExpenseData,
    token,
    setToken
  };


  return <AppContext.Provider value={ values }>
    {children}
  </AppContext.Provider>;
};

export default AppContextProvider;