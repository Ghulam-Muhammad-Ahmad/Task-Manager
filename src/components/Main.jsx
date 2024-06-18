import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Operations from './Operations'
export default function Main() {
  const [cats, setcat] = useState([])
  return (
  <>
  <div className="handler flex justify-start align-top mt-3">
    <div className="sidebar w-50 p-5 m-3 bg-[#F4F4F4] dark:bg-gray-800 rounded-lg ">
        <Sidebar setcat={setcat} />
    </div>
        <Operations cats={cats} />
  </div>
  </>
  )
}
