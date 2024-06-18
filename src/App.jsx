import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
export default function App() {
const [darkmode, setDarkmode] = useState(false);
  return (
<>
<div className={darkmode ? "dark" : ""}>
<Navbar setDarkmode={setDarkmode} darkmode={darkmode}  />
<Main />
</div>
</>
  )
}
