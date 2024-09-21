import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError('Làm ơn nhập Email hợp lệ');
      return;
    }

   if(!password) {
     setError('Làm ơn nhập mật khẩu');
     return;
   }
    setError('');
    
    // API call to authenticate user
  };

  return (
    <>
      {/* Header */}
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Đăng nhập</h4>

            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            {/* call componet input passwor */}
            <PasswordInput
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />

            {/* error */}
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Đăng nhập</button>

            {/* Go to signup page */}
            <p className='text-sm text-center mt-4'>
              Chưa có tài khoản? {''}
              <Link to='/signup' className='font-medium text-primary underline'>Đăng ký ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login