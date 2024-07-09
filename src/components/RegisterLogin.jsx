import React, { useState } from 'react'
import LoginImg from '../img/amo-tasks-pic.svg'
import Register from './Register'
import Login from './Login'
const Regsiterlogin = () => {
  const [entrystate, setEntrystate] = useState(true)
  return (
    <div className='w-[100%] min-h-[100vh] max-h-[100%] relative bg-[#3763D2]'>
<div className="ball w-[10vw] h-[20vh] bg-[#e9e9e9] rounded-full absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2"></div>
<div className="ball w-[10vw] h-[20vh] bg-[#e9e9e9] rounded-full absolute bottom-[5%] right-[15%] "></div>
      <div className='absolute md:flex-row flex-col justify-center items-stretch flex-wrap flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[60vw] md:h-[70vh] w-full'>
        <div className="left md:flex hidden flex-col bg-[#f4f4f496] border-s-2 border-t-2 border-b-2 border-[#cdcdcdde] backdrop-blur md:w-1/2  rounded-s-lg pt-4 pr-6 pb-4 pl-4 flex justify-center items-center">
          <div className="details text-[#fff] pb-10 flex flex-col justify-center items-center text-center">
            <h1 className='text-[#fff] text-4xl font-bold'>Amo Tasks</h1>
            <p>An App to manage your To do Tasks and organize the tasks.</p>
          </div>
          <img src={LoginImg} alt="Amo Tasks" />
        </div>
        <div className="right bg-[#85aef966] border-s-2 md:border-s-0 rounded-s-lg md:rounded-s-none border-e-2 border-t-2 border-b-2 border-[#cdcdcdde] w-[80%] m-auto md:m-0  backdrop-blur md:w-1/2  rounded-e-lg p-4   flex flex-col justify-center items-center">
          <div className={`flex flex-col justify-center items-center ${!entrystate ? 'hidden' : ''}`}>
            <Register setEntrystate={setEntrystate} />
          </div>
          <div className={`flex flex-col justify-center items-center ${entrystate ? 'hidden' : ''}`}>
            <Login setEntrystate={setEntrystate} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Regsiterlogin
