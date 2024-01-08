import React from 'react'
import homesection from "../assets/businesspage/1.png"
import c1 from "../assets/businesspage/2.png"
import c2 from "../assets/businesspage/3.png"
import c3 from "../assets/businesspage/4.png"
import c4 from "../assets/businesspage/5.png"
import { Link } from 'react-router-dom'

const cardStyle = {
    backgroundImage: `url(${homesection})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const Businessprofilepage = () => {

    return (
        <>
            <div className="min-h-screen bg-[#F1F5F9] flex flex-col justify-center items-center">

                <div className="headsection mt-[100px] h-[940px] lg:h-[652px] w-full flex flex-col justify-center gap-12 items-center"
                    style={cardStyle}>
                    <h1 className='text-[36px] font-semibold text-white  tracking-widest text-center'>Business Profile</h1>
                    <h1 className='text-[20px] w-[295px] md:w-[700px] font-poppins text-white text-center'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h1>
                    <div className='flex md:flex-row flex-col gap-5 justify-center items-center'>
                        <Link to="/bookatable"><button className='w-[153px] h-[43px] text-white text-[16px] bg-[#333333] rounded-md'>Book a Table</button></Link>
                        <Link to="/bookaroom"><button className='w-[153px] h-[43px] text-white text-[16px] bg-[#88211A] rounded-md'>Book a Room</button></Link>
                    </div>
                </div>

                <div className='md:w-[1150px] mt-[150px] flex flex-col justify-center items-center'>
                    <div className='md:w-full mb-[80px] w-[300px] flex flex-col justify-center items-center'>
                        <div className='md:w-full w-[300px] flex md:flex-row flex-col justify-between gap-9 md:gap-0 items-center'>
                            <img className='rounded-md shadow-2xl' src={c1} alt="" />
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Conference room</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='md:w-full mt-[80px] w-[300px] flex md:flex-row flex-col justify-between items-center gap-9 md:gap-0'>
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Wedding Venue</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                            <img className='rounded-md shadow-2xl' src={c2} alt="" />
                        </div>
                        <div className='md:w-full mt-[80px] w-[300px] flex md:flex-row flex-col justify-between gap-9 md:gap-0 items-center'>
                            <img className='rounded-md shadow-2xl' src={c3} alt="" />
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Rooms</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='md:w-full mt-[80px] w-[300px] flex md:flex-row flex-col justify-between items-center gap-9 md:gap-0'>
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Restaurant</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                            <img className='rounded-md shadow-2xl' src={c4} alt="" />
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    )
}

export default Businessprofilepage