import React from 'react'
import c from "../../assets/homepage/c.png"
import { formatDateRange } from "../../utils/utils"

const roomcard = ({ room }) => {
    const date = formatDateRange(room.availability_dates.from, room.availability_dates.to)
    return (
        <>
            <div className='w-[290px] md:w-[360px] rounded-md'>
                <img className='w-full rounded-t-md md:w-[360px] md:h-[202px]' src={room.photos[0] || c} alt="" />
                <div className='mt-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-black font-poppins font-medium text-[18px]'>{room.room_type}</p>
                        <p className='text-black font-medium'>⭐ (5.0)</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row justify-center items-center gap-1'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                            <p className='text-black text-[16px] font-light'>{room.capacity}</p></div>
                        <div className='flex flex-row justify-center items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                            <p className='text-black text-[16px]'>{room.size}</p></div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-black text-[16px] font-light'>{date}</p>
                        <p className='text-black text-[16px]'>MK{room.price_single} / Night</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default roomcard