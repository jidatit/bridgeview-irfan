import React from 'react'
import menu from "../assets/menu/menu.png"
import MapContainer from "../components/MapContainer"
import { useParams, useLocation } from 'react-router'

const Menu = () => {
    const { Id } = useParams()
    const {photo} = useLocation().state || menu
    return (
        <>
            <div className='w-full flex flex-col gap-5 justify-center items-center'>
                <button onClick={() => window.history.back()} className='mt-[190px] bg-[#88211A] h-[100px] w-[100px] rounded-full font-poppins text-white font-bold md:text-[24px]'>Back</button>
                <img className='mb-[90px] w-[350px] md:w-[630px]' src={photo||menu} alt="" />
                
            </div>
        </>
    )
}

export default Menu