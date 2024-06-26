import React, { useState } from 'react'
import { account } from '../AppwriteConfig.js';
import { useNavigate } from 'react-router-dom';
const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [process, setprocess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setprocess(true);
            // await account.deleteSession('current');
          const response = await account.create('unique()', email, password, name);
          console.log('User created successfully:', response);
          // Optionally, log in the user automatically after registration
          await account.createEmailPasswordSession(email, password);
          console.log("Login Success and account Created");
          navigate("/todos");
        } catch (error) {
            setprocess(false);
          console.error('Error creating user:', error);
          setError(error.message);
        }
      };
    return (
        <>
            <h2 className='font-bold text-white capitalize text-center text-xl'>Create an Account</h2>
            <p className='text-white px-5 text-center'>Create your Account On the Amo Tasks Application</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center mt-3'>
                <div>
                    <input
                        type="text"
                        className='bg-[#F4F7F9] py-1 md:w-[20vw] px-3 rounded-md '
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" disabled={process} className='bg-white w-[20vw] py-2 rounded-md text-black font-bold'>Register</button>
                <div className="errors text-red-200 text-sm font-semibold">{error}</div>
            </form>
            <a className="redirecttologin m-auto underline text-white text-center cursor-pointer pt-3 flex" onClick={() => props.setEntrystate(false)}>Already Registered? Then Login</a>

        </>
    )
}

export default Register
