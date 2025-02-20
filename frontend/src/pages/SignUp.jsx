import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup'
import toast from 'react-hot-toast'

function SignUp() {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const {loading, signup} = useSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className='flex items-center justify-center min-w-96 mx-auto bg-slate-400 rounded-md'>

      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Zach Leaf'
              className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          {/* username */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input
              type='text'
              placeholder='zachleaf'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />
          </div>

          {/* password */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          {/* confirm password */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block text-red-500'>
            Already have an account?
          </Link>

          {/* button */}
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp