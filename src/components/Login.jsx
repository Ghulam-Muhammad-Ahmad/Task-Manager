import React, { useState } from 'react'
import { account } from '../AppwriteConfig.js';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [process, setprocess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setprocess(true);
          await account.createEmailPasswordSession(email, password);
          console.log('Logged in successfully');
          navigate("/todos");
        //   const user = await account.get();
        //   setUser(user);
        //   console.log('User details:', user);
        } catch (error) {
            setprocess(false);
          console.error('Error logging in:', error);
          setError(error.message);
        }
      };
  return (
    <>
            <h2 className='font-bold text-white capitalize text-center text-xl'>Login</h2>
            <p className='text-white px-5 text-center'>Login to existing account on Amo Tasks.</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center mt-3'>
                <div>
                    <input
                        type="email"
                          className='bg-[#F4F7F9] py-1 md:w-[20vw] px-3 rounded-md '
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                          className='bg-[#F4F7F9] py-1 md:w-[20vw] px-3 rounded-md '
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={process} className='bg-white w-[20vw] py-2 rounded-md text-black font-bold'>Login</button>
                <div className="errors text-red-200 text-sm font-semibold">{error}</div>
            </form>
            <a className="redirecttologin m-auto underline text-white text-center cursor-pointer pt-3 flex" onClick={() => props.setEntrystate(true)}>Account not created? Register</a>

        </>
  )
}

export default Login
