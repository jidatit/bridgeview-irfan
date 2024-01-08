import React, { useState, useEffect } from 'react'
import Card from "../components/cards/weddingcard"
import c1 from "../assets/weddingpage/1.png"
import c2 from "../assets/weddingpage/2.png"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'

const Conferencepage = () => {

    const [Weddings, setWeddings] = useState([]);


    const getAllWeddings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "weddings"));
            let arr = []
            querySnapshot.forEach((wedd) => {
                let r = {
                    ...wedd.data(),
                    id: wedd.id
                }
                arr.push(r)
            });
            setWeddings(arr);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllWeddings();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-white w-full flex flex-col justify-center items-center">
                <div className='md:w-[1150px] mt-[150px] flex flex-col justify-center items-center'>

                    <h1 className='text-[#88211A] text-center md:text-[36px] text-[20px] font-semibold font-poppins mt-[20px] mb-[50px]'>Explore our Wedding Venue</h1>

                    <div className='md:w-full h-[456px] w-[300px] pb-[20px] md:pb-0 md:h-[246px] bg-[#88211A] flex flex-col md:flex-row justify-between items-center'>
                        <div className="bg-transparent text-center h-full flex flex-col justify-center items-center flex-grow">
                            <p className='font-medium text-white text-[29px] md:w-[340px]'>Confirm your Reservation with us</p>
                        </div>
                        <div className='flex bg-transparent flex-grow h-full gap-3 flex-col justify-center items-center'>
                            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px] text-white' htmlFor="date">Date</label>
                                    <input className='w-[256px] text-center h-[45px] rounded-sm' type="date" name="date" id="date" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px] text-white' htmlFor="date">How long is your stay</label>
                                    <select className='w-[256px] text-center h-[45px] rounded-sm'>
                                        <option value="1 Day">1 Day</option>
                                        <option value="2 Day">2 Day</option>
                                        <option value="3 Day">3 Day</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex flex-col md:justify-end justify-center items-center md:items-end md:mr-[140px]'>
                                <Link to="/details/weddings/JqmWuDZSSsDxqqkGKfpm"><button className='w-[189px] h-[45px] text-[18px] font-normal bg-[#30981F] text-white rounded-md'>Confirm</button></Link>
                            </div>
                        </div>
                    </div>

                    <div className='md:w-full mt-[60px] mb-[70px] w-[300px] grid md:grid-cols-3 grid-cols-1 items-center justify-center gap-4'>
                    {Weddings.map(wedd => (
                            <Link key={wedd.id} to={`/details/weddings/${wedd.id}`}>
                                <Card key={wedd.id} wedd={wedd} />
                            </Link>
                        ))}
                    </div>

                    <div className='md:w-full mb-[80px] w-[300px] flex flex-col justify-center items-center'>
                        <div className='md:w-full w-[300px] flex md:flex-row flex-col justify-between gap-9 md:gap-0 items-center'>
                            <img className='rounded-md shadow-2xl' src={c1} alt="" />
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Wedding Venue Speciality</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='md:w-full mt-[80px] w-[300px] flex md:flex-row flex-col justify-between items-center gap-9 md:gap-0'>
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-black font-semibold text-[20px] md:text-[28px]'>Wedding Venue Speciality</h1>
                                <p className='text-[18px] text-black md:w-[550px]'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, rhoncus. em neque Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                            </div>
                            <img className='rounded-md shadow-2xl' src={c2} alt="" />
                        </div>
                    </div>

                    <div className='md:w-full mb-[50px] w-[300px] flex md:flex-row flex-col justify-center items-center gap-5'>
                        <button className='w-[234px] font-light text-[20px] h-[60px] bg-[#333333] text-white rounded-md'>Book a Wedding</button>
                        <button className='w-[234px] font-light text-[20px] h-[60px] bg-[#88211A] text-white rounded-md'>Get in Touch</button>
                    </div>

                </div>

                
            </div>
        </>
    )
}

export default Conferencepage