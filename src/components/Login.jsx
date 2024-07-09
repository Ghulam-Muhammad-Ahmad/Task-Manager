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
            <p className='text-white px-5 text-center'>Login to existing account in Amo Tasks.</p>
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
                <button type="submit" disabled={process} className='bg-white disabled:opacity-10  w-3/4  md:w-[20vw] py-2 rounded-md text-black font-bold'> {process ? <div role="status" className='flex justify-center items-center'>
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
 : 'Login'}</button>
                <div className="errors text-red-200 text-sm font-semibold">{error}</div>
            </form>
            <a className="redirecttologin m-auto underline text-white hover:text-[#000] text-center cursor-pointer pt-3 flex" onClick={() => props.setEntrystate(true)}>Account not created? Register</a>

        </>
  )
}

export default Login
