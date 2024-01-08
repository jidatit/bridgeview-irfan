import React, { useState, useEffect } from 'react'
import c1 from "../assets/bookatable/1.png"
import c2 from "../assets/bookatable/2.png"
import { Link } from 'react-router-dom'
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";

const Bookatable = () => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
            booking_for: 'Restaurant: ' + (name === 'restaurant_name' ? value : Form.restaurant_name) +
                ', Menu Type: ' + (name === 'menu_type' ? value : Form.menu_type)
        }));
    };

    const [Form, setForm] = useState({
        restaurant: true,
        restaurant_name: '',
        menu_type: '',
        date: '',
        time: '',
        booking_for: ''
    });


    const [Menus, setMenus] = useState([]);


    const getAllMenus = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "restaurant-menus"));
            let arr = []
            querySnapshot.forEach((offer) => {
                let r = {
                    ...offer.data(),
                    id: offer.id
                }
                arr.push(r)
            });
            setMenus(arr);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllMenus();
    }, [])

    const FirstMenus = Menus.filter((menu) => menu.restaurant_name === "Lemon & Spice Restaurant")
    const SecondMenus = Menus.filter((menu) => menu.restaurant_name === "City Cafe")

    return (
        <>
            <div className="min-h-screen bg-[#88211A] w-full flex flex-col justify-center items-center">
                <div className='md:w-[1150px] mt-[150px] flex flex-col justify-center items-center'>


                    <div className='md:w-full h-[600px] w-[300px] pb-[20px] md:pb-0 md:h-[300px] bg-[#DDC87D] flex flex-col md:flex-row justify-between items-center'>
                        <div className="bg-transparent text-center h-full flex flex-col justify-center items-center flex-grow">
                            <p className='font-medium text-black text-[29px] md:w-[340px]'>Confirm your Reservation with us</p>
                        </div>
                        <div className='flex bg-transparent flex-grow h-full gap-3 flex-col justify-center items-center'>

                            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="restaurant_name">Select Restaurant</label>
                                    <select onChange={handleChange} className='w-[256px] text-center h-[45px] rounded-sm' name="restaurant_name" id="restaurant_name" required>
                                        <option value="City Cafe">City Cafe</option>
                                        <option value="Lemon & Spice Restaurant">Lemon & Spice Restaurant</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="menu_type">Menu Type</label>
                                    <select onChange={handleChange} className='w-[256px] text-center h-[45px] rounded-sm' name="menu_type" id="menu_type" required>
                                        <option value="Menu">Menu</option>
                                    </select>
                                </div>
                            </div>

                            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="date">Date</label>
                                    <input onChange={handleChange} className='w-[256px] text-center h-[45px] rounded-sm' type="date" name="date" id="date" required />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[20px]' htmlFor="date">Time for your reservation</label>
                                    <input onChange={handleChange} className='w-[256px] text-center h-[45px] rounded-sm' type="time" name="time" id="time" required />
                                </div>
                            </div>
                            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
                                <div className='flex flex-col'>
                                    <select onChange={handleChange} className='w-[256px] text-center h-[45px] rounded-sm' name="people" id="people" required>
                                        <option selected disabled value="">Amount of people</option>
                                        {
                                            Array.from({ length: 100 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1} people
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                        <Link to={`/booking-confirmation/r3s7AuRaNt`} state={{ Form }}><button className='w-[256px] h-[45px] text-[18px] font-normal bg-[#30981F] text-white rounded-md'>Confirm</button></Link>
                            </div>
                        </div>
                    </div>

                    <div className='md:w-full mt-[80px] mb-[80px] w-[300px] flex flex-col justify-center items-center'>
                        <div className='md:w-full w-[300px] flex md:flex-row flex-col justify-around gap-9 md:gap-0 items-center'>
                            <img className='rounded-md shadow-2xl w-[300px] h-[225px] md:w-[550px] md:h-[525px]' src={c1} alt="" />
                            <div className='flex flex-col gap-5 w-[240px] md:w-[424px]'>
                                <h1 className='text-white font-semibold text-center text-[20px] md:text-[28px]'>Lemon & Spice Restaurant Menu</h1>
                                <ul>
                                    {
                                        FirstMenus?.map((menu => (
                                            <Link key={menu.id} to={`/menu/${menu.id}`} state={{ photo: menu.photo }}>
                                                <div className="max-w-7xl mx-auto mt-[5px] mb-[5px]">
                                                    <div className="relative group">
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                                        <div className="relative flex flex-col justify-center items-center px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none items-top space-x-6">
                                                            <li className='text-[18px] text-center text-black font-bold'>{menu.category}</li>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='md:w-full mt-[80px] w-[300px] flex md:flex-row flex-col justify-around items-center gap-9 md:gap-0'>
                            <div className='flex flex-col gap-5 w-[240px] md:w-[424px]'>
                                <h1 className='text-white text-center font-semibold text-[20px] md:text-[28px]'>City Cafe Menu</h1>
                                <ul>
                                    {
                                        SecondMenus?.map((menu => (
                                            <Link key={menu.id} to={`/menu/${menu.id}`} state={{ photo: menu.photo }}>
                                                <div className="max-w-7xl mx-auto mt-[5px] mb-[5px]">
                                                    <div className="relative group">
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                                        <div className="relative flex flex-col justify-center items-center px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none items-top space-x-6">
                                                            <li className='text-[18px] text-center text-black font-bold'>{menu.category}</li>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )))
                                    }
                                </ul>
                            </div>
                            <img className='rounded-md shadow-2xl w-[300px] h-[225px] md:w-[550px] md:h-[525px]' src={c2} alt="" />
                        </div>
                    </div>

                </div>
               
            </div>
        </>
    )
}

export default Bookatable