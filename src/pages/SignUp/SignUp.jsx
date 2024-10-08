import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/AxiosInstance';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Vui lòng nhập tên');
      return;
    }

    if (!validateEmail(email)) {
      setError('Vui lòng nhập Email');
      return;
    }

    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    //SignUp API call
    try {
      const respone = await axiosInstance.post('/create-account',
         {fullName : name, email: email, password: password });

      //Handle successfull login response
      if (respone.data && respone.data.error) {
        setError(respone.data.message);
        return;
      }

      if (respone.data && respone.data.accessToken){
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
  }

  return (
    <>
      {/* Header */}
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Đăng ký</h4>

            <input
              type="text"
              placeholder='Tên'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)} />

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

            <button type='submit' className='btn-primary'>Đăng ký</button>

            {/* Go to signup page */}
            <p className='text-sm text-center mt-4'>
              Đã có tài khoản? {''}
              <Link to='/login' className='font-medium text-primary underline'>Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp