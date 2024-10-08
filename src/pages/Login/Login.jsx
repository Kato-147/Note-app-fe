import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/AxiosInstance'

const Login = () => {

  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Làm ơn nhập Email hợp lệ');
      return;
    }

    if (!password) {
      setError('Làm ơn nhập mật khẩu');
      return;
    }
    setError('');

    // Login API call
    try {
      const respone = await axiosInstance.post('/login',
         { email: email, password: password });

      //Handle successfull login response
      if (respone.data && respone.data.accessToken) {
        localStorage.setItem('token', respone.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.respone && error.respone.data && error.respone.data.message){
        setError(error.respone.data.message);
      }else{
        setError('Đã xảy ra l��i, vui lòng thử lại sau');
      }
    }
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
              onChange={(e) => setPassword(e.target.value)} />

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