import React, { useState } from 'react'
import LoginImg from '../img/amo-tasks-pic.svg'
import Register from './Register'
import Login from './Login'
const Regsiterlogin = () => {
const [entrystate, setEntrystate] = useState(true)    
  return (
    <div className='absolute md:flex-row flex-col justify-center items-stretch flex-wrap flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:min-w-[60vw] md:min-h-[70vh] w-full'>
      <div className="left md:block hidden flex-col bg-[#F4F4F4] md:w-1/2  rounded-s-lg pt-4 pr-6 pb-4 pl-4 flex justify-center items-center">
      <div className="details pb-10 flex flex-col justify-center items-center text-center">
        <h1 className='text-[#000] text-4xl font-bold'>Amo Tasks</h1>
        <p>An App to manage your To do Tasks and organize the tasks.</p>
      </div>
      <img src={LoginImg} alt="Amo Tasks" />
      </div>
      <div className="right bg-[#3763D2] md:w-1/2  rounded-lg p-4  md:ml-[-10px] flex flex-col justify-center items-center">
  <div className={`flex flex-col justify-center items-center ${!entrystate ? 'hidden' : ''}`}>
    <Register setEntrystate={setEntrystate} />
  </div>
  <div className={`flex flex-col justify-center items-center ${entrystate ? 'hidden' : ''}`}>
    <Login setEntrystate={setEntrystate} />
  </div>
</div>

    </div>
  )
}

export default Regsiterlogin
