import React, {useState} from 'react'
import { ReactComponent as LogoSVG } from "../../images/logo.svg";
import Login from './Login'
import Signup from './signup'

const Authentication = () => {
    const [condition, setCondition] = useState(true);

  return (
    <body className='w-screen h-screen bg-[#ffd8ca]/50 flex flex-col justify-center items-center gap-12'>  
        <LogoSVG/>
        <div>
        {condition ? 
        <Login changeCondition={() => setCondition(false)} /> 
        : <Signup changeCondition={() => setCondition(true)} />
        }
        </div>
    </body>
  )
}

export default Authentication