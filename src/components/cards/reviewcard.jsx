import React from 'react'
import userimg from "../../assets/detailspage/user.png"

const reviewcard = () => {
    return (
        <>
            <div className='bg-[#EBF2FA] w-[290px] rounded-md flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5 md:w-[480px] h-[215px] md:h-[144px]'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <img src={userimg} alt="" />
                    <p className='text-[14px] font-poppins text-black'>Will Smith</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div className='w-full flex flex-row justify-center items-center gap-3'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <p className='font-normal text-[12px] text-black'>Overall</p>
                            <p className='text-[12px] font-bold font-poppins text-[#064789]'>5</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <p className='font-normal text-[12px] text-black'>Food</p>
                            <p className='text-[12px] font-bold font-poppins text-[#064789]'>5</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <p className='font-normal text-[12px] text-black'>Ambience</p>
                            <p className='text-[12px] font-bold font-poppins text-[#064789]'>5</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <p className='font-normal text-[12px] text-black'>Service</p>
                            <p className='text-[12px] font-bold font-poppins text-[#064789]'>5</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <p className='text-[14px] font-poppins text-center w-[290px]'>
                            Consectetuer iaculis magnis lacus orci curabitur purus leo sit rutrum elit lacus arcu dictum eleifend elit risus sociis ad curabitur suspendisse tempor hendrerit.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default reviewcard