import React from 'react'
import c from "../../assets/homepage/c.png"
import {formatDateRange} from "../../utils/utils"

const conferencecard = ({confo}) => {
    const date = formatDateRange(confo.availability_dates.from, confo.availability_dates.to)
    return (
        <>
            <div className='w-[290px] md:w-[360px] rounded-md'>
                <img className='w-full rounded-t-md' src={c} alt="" />
                <div className='mt-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white font-poppins font-medium text-[15px]'>{confo.name||"Conference Room 3"}</p>
                        <p className='text-white font-medium'>⭐ (5.0)</p>
                    </div>
                    <p className='text-white text-[16px] font-light'>{date||"Oct 20 - 28"}</p>
                    {/* <p className='text-white text-[16px]'>{confo.price + " MK / Event" ||"MK200 / Event"}</p> */}
                </div>
            </div>
        </>
    )
}

export default conferencecard