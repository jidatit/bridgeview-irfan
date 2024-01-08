import React, { useState, useEffect } from 'react'
import Card from "../components/cards/bookaroomcard"
import { Link } from 'react-router-dom'
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";

const Bookaroom = () => {

    const [Rooms, setRooms] = useState([]);


    const getAllRooms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "rooms"));
            let arr = []
            querySnapshot.forEach((room) => {
                let r = {
                    ...room.data(),
                    id: room.id
                }
                arr.push(r)
            });
            setRooms(arr);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllRooms();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-[#88211A] w-full flex flex-col justify-center items-center">
                <div className='md:w-[1150px] mt-[150px] flex flex-col justify-center items-center'>


                    <div className='md:w-full h-[456px] w-[300px] pb-[20px] md:pb-0 md:h-[246px] bg-[#DDC87D] flex flex-col md:flex-row justify-between items-center'>
                        <div className="bg-transparent text-center h-full flex flex-col justify-center items-center flex-grow">
                            <p className='font-medium text-black text-[29px] md:w-[340px]'>Confirm your Reservation with us</p>
                        </div>
                        <div className='flex bg-transparent flex-grow h-full gap-3 flex-col justify-center items-center'>
                            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="date">Date</label>
                                    <input className='w-[256px] text-center h-[45px] rounded-sm' type="date" name="date" id="date" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="date">How long is your stay</label>
                                    <select className='w-[256px] text-center h-[45px] rounded-sm'>
                                        <option value="1 Day">1 Day</option>
                                        <option value="2 Day">2 Day</option>
                                        <option value="3 Day">3 Day</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex flex-col md:justify-end justify-center items-center md:items-end md:mr-[140px]'>
                                <button className='w-[189px] h-[45px] text-[18px] font-normal bg-[#30981F] text-white rounded-md'>Confirm</button>
                            </div>
                        </div>
                    </div>

                    <div className=" mb-[50px] mt-[80px] card md:w-[1150px] grid md:grid-cols-2 gap-5 items-center justify-center">
                    {Rooms.map(room => (
                            <Link key={room.id} to={`/details/rooms/${room.id}`}>
                                <Card key={room.id} room={room} />
                            </Link>
                        ))}
                    </div>

                </div>
                <button className='w-[234px] h-[60px] mt-[60px] mb-[60px] bg-[#DDC87D] font-semibold text-black text-[20px] rounded-md'>View More</button>
                
            </div>
        </>
    )
}

export default Bookaroom