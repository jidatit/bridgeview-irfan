import React, { useEffect, useState } from 'react'
import c1 from "../assets/bookingconfirmpage/1.png"
import calicon from "../assets/bookingconfirmpage/cal.png"
import timeicon from "../assets/bookingconfirmpage/time.png"
import peopleicon from "../assets/bookingconfirmpage/people.png"
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const Bookingconfirm = () => {
    const location = useLocation();
    const [PayLink, setPayLink] = useState('');

    const handleBooking = async () => {
        try {
            const docRef = await addDoc(collection(db, "bookings"), BookingData);

            const firstname = document.getElementById('firstname').value
            const lastname = document.getElementById('lastname').value
            const email = document.getElementById('email').value
            const contactNumber = document.getElementById('contact_number').value
            const specialRequest = document.getElementById('special_request').value
            const occasion = document.getElementById('occasion').value

            const templateParams = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                contact_number: contactNumber,
                occasion: occasion,
                special_request: specialRequest,
                date: location.state.Form.date,
                time: location.state.Form.time,
                people: location.state.Form.people,
                booking_for: location.state.Form.booking_for,
                special_instructions: location.state.Form.special_instructions,
                from_name: 'Bridgeview Hotel and conference'
            };

            emailjs
                .send('service_yn8qom5', 'template_ul73rmw', templateParams, "YjIyFrhcYaKSBec8s")
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                    console.log('FAILED...', err);
                });

            toast.success('Thankyou for the Booking! You will shortly recieve the booking details.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

        } catch (error) {
            console.log(error)
        }
    }

    const [BookingData, setBookingData] = useState({
        ...location.state.Form,
        firstname: '',
        lastname: '',
        contact_number: '',
        email: '',
        occasion: '',
        special_request: '',
        payment_status: 'pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setBookingData({
            ...BookingData,
            [name]: value
        })
    }

    const generateBookingLink = () => {
        const roomType = location.state.Form && location.state.Form.booking_for;
        const roomLinks = {
            'Economy Room': 'https://buy.stripe.com/dR616vdPJ6gH9DWbIJ',
            'Standard Double': 'https://buy.stripe.com/dR62az12X6gHdUc3ce',
            'Deluxe Suite Room': 'https://buy.stripe.com/7sI8yXeTN48z9DW28f',
            'Standard Twin': 'https://buy.stripe.com/cN23eD6nh0Wn9DW9AI',
            'Deluxe': 'https://buy.stripe.com/4gw7uT8vp9sTaI0bIR',
            'Family Room': 'https://buy.stripe.com/3cs4iHh1VdJ96rK5ku',
            'default': '#',
        };
        setPayLink(roomLinks[roomType])
        return roomLinks[roomType] || roomLinks['default'];
    };

    useEffect(() => {
        generateBookingLink()
    }, [])

    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center'>

                <div className='md:w-[1150px] mt-[150px] md:mt-[100px] flex flex-col justify-center items-center'>
                    <h1 className='md:text-[36px]  md:mt-[100px] mb-[40px] font-semibold text-center text-[20px] text-[#88211A]'>Confirm your Reservation</h1>

                    <div className='w-full mb-[60px] justify-center items-center flex flex-col gap-5 md:flex-row'>
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <h1 className='text-[20px] text-black font-bold'>You’re almost done!</h1>
                            <img className='rounded-md' src={c1} alt="" />
                        </div>
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <h1 className='text-[20px] text-black font-bold'>{location.state.Form.restaurant ? "Restaurant" : "Reserve" || "Restaurant"} Booking</h1>
                            <div className='flex flex-row justify-center items-center gap-2 md:gap-4'>
                                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                                    <img src={calicon} alt="" />
                                    <p>{location.state.Form.date || "12/23/2023"}</p>
                                </div>
                                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                                    <img src={timeicon} alt="" />
                                    <p>{location.state.Form.time || "5:78 PM"}</p>
                                </div>
                                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                                    <img src={peopleicon} alt="" />
                                    <p>{location.state.Form.people + " People" || "4 People"}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mx-auto w-[300px] md:w-[550px] bg-white">
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="firstname" className="mb-3 block text-base font-medium text-[#07074D]">
                                        First Name
                                    </label>
                                    <input onChange={handleChange} type="text" name="firstname" id="firstname" placeholder="First Name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="lastname" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Last Name
                                    </label>
                                    <input onChange={handleChange} type="text" name="lastname" id="lastname" placeholder="Last Name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="contact_number" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Contact Number
                                    </label>
                                    <input onChange={handleChange} type="text" name="contact_number" id="contact_number" placeholder="Contact Number"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Email
                                    </label>
                                    <input onChange={handleChange} type="text" name="email" id="email" placeholder="Email"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="occasion" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Occasion (Optional)
                                    </label>
                                    <input onChange={handleChange} type="text" name="occasion" id="occasion" placeholder="Occasion (Optional)"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="special_request" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Special Request (Optional)
                                    </label>
                                    <input onChange={handleChange} type="text" name="special_request" id="special_request" placeholder="Special Request (Optional)"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medBookaroomclassName=ium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>

                        <div className='mb-[60px] md:mb-[70px]'>
                            <a href={PayLink}>
                                <button
                                    onClick={handleBooking}
                                    className="hover:shadow-form rounded-md bg-[#523735] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Pay Now
                                </button>
                            </a>
                            <button
                                onClick={handleBooking}
                                className="hover:shadow-form md:ml-2 mt-2 rounded-md bg-[#88211A] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Pay at the Hotel
                            </button>
                        </div>

                    </div>
                    <ToastContainer />
                </div>

            </div>
        </>
    )
}

export default Bookingconfirm