import React, { useState } from 'react'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Input } from '../ui/input';

const PasswordInput = ({ value, onChange, placeholder }) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    // Toggle password visibility function - change state of isShowPassword
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center bg-transparent mb-3 rounded'>

            {/* Input text */}
            <Input
                type={isShowPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Mật khẩu'}
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />

            {/* Icon show or hide password - used ternary operator switch back and forth between 2 icons*/}
            {isShowPassword ? (<FaRegEye
                size={22}
                className='text-primary cursor-pointer'
                onClick={() => toggleShowPassword()}
            />) : (<FaRegEyeSlash
                size={22}
                className='text-slate-400 cursor-pointer'
                onClick={() => toggleShowPassword()}
            />)}

        </div>
    )
}

export default PasswordInput