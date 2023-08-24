import React, {useState} from 'react'
import Input from '../Input';
import NewRecipeModal from '../NewRecipeModal';
import { ReactComponent as LogoSVG } from "../../images/logo.svg";

const NavBar = () => {
    const [search, setSearch] = useState();
    const [openModal, setOpenModal] = useState(false)

  return (
    <>
        <div className='w-full flex flex-row justify-center items-center border-b-2	'>
            <div className='container flex flex-row justify-between p-5'>
                <LogoSVG/>
                <Input
                    type="text"
                    placeholder="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className='bg-[#df0052]/70 w-32 h-10 rounded-full text-white text-xl'
                    onClick={() => setOpenModal(true)}
                    >Add recipe</button>
                </div>
        </div>
        <NewRecipeModal open = {openModal} onClose={() => setOpenModal(false)}/>
    </>
  )
}

export default NavBar