import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"
import { useState, useEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"


ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  Title
)

const History = () => {

  const { IncomeData, ExpenseData } = useContext(AppContext)

  const parsePrice = (price) => {
    return typeof price === "number" ? price : parseFloat(price.replace(/[^0-9, -]+/g, ""))
  }

  const [minIncome, setMinIncome] = useState(0)
  const [maxIncome, setMaxIncome] = useState(0)
  const [minExpense, setMinExpense] = useState(0)
  const [maxExpense, setMaxExpense] = useState(0)

  useEffect(() => {
    const incomePrices = IncomeData.map((item ) => parsePrice(item.amount))
    const expensePrices = ExpenseData.map((item ) => parsePrice(item.amount))

    setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0)
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0)
    setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0)
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0)
  })

  const chartData = {
    labels: [
      "Total Income",
      "Total Expense",
      "Min Income",
      "Max Income",
      "Min Expense",
      "Max Expense",
    ],
    datasets: [
      {
        data: [
          IncomeData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          ExpenseData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense,
        ],
        backgroundColor: [
          "#36A2EB", //Total Income
          "#FF6384", //Total Expense
          "#4BC0C0", //Min Income
          "#FFCE56", //Max Income
          "#9966FF", //Min Expense
          "#FF9F40", //Max Expense
        ],
        hoverBackgroundColor: [
          "#66b3FF",
          "#FF6384",
          "#70D8D8",
          "#FFD966",
          "#838FFF",
          "#FFB673"
        ]
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins:{
      title:{
        display: true,
        text: "Income and Expense Breakdown"
      },
      legend: {
        position: "bottom"
      }
    }
  }
  
  return (
    <div className="w-full hidden lg:block mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Recent History
      </h1>
      {/* For Income */}
      <div className="space-y-4 h-72 overflow-y-scroll">
        {IncomeData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border-gray-200"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-medium text-gray-800">
                {item.title}
              </h1>
              <p className="text-sm text-gray-600">₹ {item.amount}</p>
            </div>
            <div className="text-sm font-semibold text-green-500">
              ₹ {item.amount}
            </div>
          </div>
        ))}
      </div>

      {/* For Expense */}
      <div className="space-y-4 h-72 overflow-y-scroll">
        {ExpenseData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border-gray-200"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-medium text-gray-800">
                {item.title}
              </h1>
              <p className="text-sm text-gray-600">₹ {item.amount}</p>
            </div>
            <div className="text-sm font-semibold text-red-500">
              ₹ {item.amount}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Spend Overview</h2>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default History