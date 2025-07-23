import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Register = () => {
  const navigate = useNavigate()

  const { handleRegister } = useContext(AppContext)

  const [isModal, setIsModal] = useState(true)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleModalClose = () => {
    setIsModal(false)
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(formData.email, formData.password)
    setIsModal(false)
    navigate('/')
  }

  return (
    <>
      {isModal && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg w-96 p-6'>
            <h2 className='text-xl font-semibold'>Register</h2>
            <button
              onClick={handleModalClose}
              className='text-gray-600 hover:text-gray-900 text-2xl'
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none'
                  required
                />
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
              >
                Register
              </button>
            </form>

            <p className='text-sm text-center mt-4'>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className='text-blue-500 hover:underline'
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Register
