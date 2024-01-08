import React from 'react'
import c from "../../assets/weddingpage/c.png"
import {formatDateRange} from "../../utils/utils"

const weddingcard = ({wedd}) => {
    const date = formatDateRange(wedd.availability_dates.from, wedd.availability_dates.to)
    return (
        <>
            <div className='w-[290px] md:w-[360px] rounded-md'>
                <img className='w-full rounded-t-md' src={c} alt="" />
                <div className='mt-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-black font-poppins font-medium text-[18px]'>{wedd.wedding_room_number||"Conference Room 3"}</p>
                        <p className='text-black font-medium'>⭐ (5.0)</p>
                    </div>
                    <p className='text-black text-[16px] font-light'>{date||"Oct 20 - 28"}</p>
                    <p className='text-black text-[16px]'>{wedd.price_per_wedding + "MK / Event"||"MK200 / Event"}</p>
                </div>
            </div>
        </>
    )
}

export default weddingcard