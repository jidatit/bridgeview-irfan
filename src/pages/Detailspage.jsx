import React, { useState, useEffect } from 'react'
import homesection from "../assets/detailspage/1.png"
import r from "../assets/detailspage/r.png"
import f from "../assets/detailspage/f.png"
import menuimg from "../assets/detailspage/menu.png"
import Reviewcard from '../components/cards/reviewcard'
import MapContainer from '../components/MapContainer'
import { Link, useParams } from 'react-router-dom'
import { db } from "../firebase"
import { collection, doc, getDoc } from 'firebase/firestore'
import { hasEmptyPropInObj } from '../utils/utils'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Detailspage = () => {

    const [isCarouselOpen, setCarouselOpen] = useState(false);

    const openCarousel = () => {
        setCarouselOpen(true);
    };

    const [Entity, setEntity] = useState({
        name: "",
        b_descrip: "",
        d_descrip: "",
        price_single: "",
        price_double: "",
        dates: {
            from: '',
            to: ''
        },
        photos: [],

        size: "",
        capacity: "",
        bed: [],
        separate_room: '',
        lounge: ''
    });

    const { Id, Category } = useParams()

    const getEntityById = async () => {
        try {
            const collectionRef = collection(db, Category);
            const docRef = doc(collectionRef, Id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                if (Category === "rooms") {
                    setEntity({
                        name: docData.room_type,
                        price_single: docData.price_single,
                        price_double: docData.price_double,
                        b_descrip: docData.brief_description_of_room,
                        d_descrip: docData.detailed_description_of_room,
                        dates: {
                            from: docData.availability_dates.from || "null",
                            to: docData.availability_dates.to || "null"
                        },
                        photos: docData.photos ? docData.photos : null,
                        size: docData.size || "null",
                        capacity: docData.capacity || "null",
                        bed: docData.bed ? docData.bed : null,
                        separate_room: docData.separate_room || "null",
                        lounge: docData.lounge || "null"
                    })
                    setForm({
                        ...Form,
                        booking_for: docData.room_type,
                        price_single: docData.price_single,
                        type:'room'
                    })
                }
                if (Category === "weddings") {
                    setEntity({
                        name: docData.wedding_room_number,
                        capacity: docData.capacity,
                        dates: {
                            from: docData.availability_dates.from || "null",
                            to: docData.availability_dates.to || "null"
                        },
                        b_descrip: docData.brief_description_of_venue,
                        d_descrip: docData.detailed_description_of_venue,
                        price_single: docData.price_per_wedding,
                        photos: docData.photos ? docData.photos : null,
                    })
                    setForm({
                        ...Form,
                        booking_for: docData.wedding_room_number
                    })
                }
                if (Category === "conferences") {
                    setEntity({
                        name: docData.name,
                        capacity: docData.capacity,
                        price_single: docData.price,
                        dates: {
                            from: docData.availability_dates.from || "null",
                            to: docData.availability_dates.to || "null"
                        },
                        photos: docData.photos ? docData.photos : null,
                        b_descrip: docData.brief_description_of_venue || "null",
                        d_descrip: docData.detailed_description_of_venue || "null",
                    })
                    setForm({
                        ...Form,
                        booking_for: docData.name
                    })
                }
            } else {
                console.log("Document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    useEffect(() => {
        getEntityById()
    }, [])

    const cardStyle = {
        backgroundImage: `url(${Entity?.photos[0] || homesection})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const [Form, setForm] = useState({
        people: '',
        booking_for: '',
        date: '',
        time: '',
        special_instructions: '',
        price_single: '',
        type:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...Form,
            [name]: value
        })
    }


    return (
        <>
            <div className='w-full flex flex-col justify-center bg-[#FAFBFF] items-center gap-2'>
                <div className="firstsection w-[300px] md:w-[1150px] flex flex-col justify-center items-center h-[450px] mt-[190px] rounded-md" style={cardStyle}>
                    <button onClick={openCarousel} className='bg-[#88211A] md:mt-[160px] rounded-lg font-poppins font-bold text-[20px] text-white px-3 py-3'>See all Photos</button>
                </div>

                {isCarouselOpen && (
                    <Lightbox
                        open={isCarouselOpen}
                        close={() => setCarouselOpen(false)}
                        slides={Entity.photos?.map((Imgsrc) => ({ src: Imgsrc }))}
                    />
                )}

                <div className='md:mt-[-50px] mb-[70px] mt-[30px] w-[300px] md:w-[1150px] flex flex-col md:flex-row justify-center gap-2'>

                    <div className={`bg-white rounded-lg flex flex-col items-center w-[300px] md:w-[600px] pb-[30px]`}>
                        <div className='w-full border-b-2'>
                            <p className='font-poppins font-bold py-4 text-center md:text-start md:px-[60px] text-[17px] md:text-[20px] text-black'>{Entity.name || "Wedding Venue Name"}</p>
                        </div>
                        <div className={`w-full border-b-2 py-4 px-[50px] flex flex-col md:flex-row ${Category !== "rooms" ? "justify-center" : "justify-start"}  gap-7 items-center`}>
                            <div className="flex flex-row justify-center items-center gap-2">
                                <p>⭐⭐⭐⭐⭐</p><p className='text-[16px]'>5.0</p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-2">
                                <img src={r} alt="" />
                                <p className='text-[16px]'>60 Reviews</p>
                            </div>
                            {Category !== "rooms" && (<div className="flex flex-row justify-center items-center gap-2">
                                <img src={f} alt="" />
                                <p className='text-[16px]'>Menu of your choice</p>
                            </div>)}

                        </div>
                        <div className='w-[260px] md:w-[480px] mt-[20px] flex flex-col justify-center items-center gap-2'>
                            <p>{Entity.b_descrip || "Consectetuer iaculis magnis lacus orci curabitur purus leo sit rutrum elit lacus arcu dictum eleifend elit risus sociis ad curabitur suspendisse tempor hendrerit."}</p>
                            <p>{Entity.d_descrip || "Justo per gravida montes. Nam fusce per suscipit posuere penatibus platea. Pretium tempor vehicula. Nunc pulvinar auctor maecenas blandit est integer orci nullam lorem. Auctor. Cum accumsan ridiculus enim neque lorem nam imperdiet."}</p>
                        </div>
                        <div className='w-full mt-[20px] flex md:flex-row flex-col justify-center items-center h-[130px] gap-2 md:gap-7 bg-[#89231C] md:h-[91px]'>
                            <p className='text-[20px] font-bold font-poppins text-white'>Book your Reservation</p>
                            <button className='font-poppins text-[16px] py-2 text-white rounded-md px-3 border'>View Details</button>
                        </div>
                        {Category !== "rooms" && (
                            <>
                                <div className='w-[300px] mt-[20px] md:w-[480px] flex flex-col justify-center items-center gap-1'>
                                    <div className='w-full'>
                                        <p className='text-[20px] font-bold font-poppins md:text-start text-center'>Popular Dishes</p>
                                    </div>
                                    <div className='w-full mt-[10px] flex flex-col md:flex-row justify-between md:gap-0 gap-3 items-center'>
                                        <div className='border relative border-b-2 flex flex-col gap-1 w-[214px] h-[173px]'>
                                            <p className='text-[14px] px-2 py-2 font-bold font-poppins'>Beef Stake</p>
                                            <p className='text-[13px] px-2 font-normal font-poppins'>Consectetuer iaculis magnis lacus orci curabitur purus leo sit</p><p className='text-[13px] px-2 font-normal font-poppins'>Consectetuer iaculis magnis lacus orci curabitur purus leo sit .</p>
                                            <p className='absolute bottom-1 right-2 text-[10px] font-normal italic font-poppins'>33 Reviews</p>
                                        </div>
                                        <div className='border relative border-b-2 flex flex-col gap-1 w-[214px] h-[173px]'>
                                            <p className='text-[14px] px-2 py-2 font-bold font-poppins'>Beef Stake</p>
                                            <p className='text-[13px] px-2 font-normal font-poppins'>Consectetuer iaculis magnis lacus orci curabitur purus leo sit</p><p className='text-[13px] px-2 font-normal font-poppins'>Consectetuer iaculis magnis lacus orci curabitur purus leo sit .</p>
                                            <p className='absolute bottom-1 right-2 text-[10px] font-normal italic font-poppins'>33 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[300px] mt-[20px] md:w-[480px] flex flex-col justify-center items-center gap-1'>
                                    <div className='w-full'>
                                        <p className='text-[20px] font-bold font-poppins md:text-start text-center'>Menu</p>
                                    </div>
                                    <div className='w-full flex flex-col justify-center items-center mt-[20px]'>
                                        <Link to="/menu/sqKt6SiCm2AGDXrNB5bL"><img className='w-[258px] h-[441px]' src={menuimg} alt="" /></Link>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className='w-[300px] mt-[20px] md:w-[480px] flex flex-col justify-center items-center gap-1'>
                            <div className='w-full'>
                                <p className='text-[20px] font-bold font-poppins md:text-start text-center'>Reviews</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-5 mt-[20px]'>
                                <Reviewcard />
                                <Reviewcard />
                                <Reviewcard />
                                <Reviewcard />
                            </div>
                        </div>

                    </div>


                    <div className='bg-white rounded-lg flex flex-col items-center gap-2 w-[300px] md:w-[480px] h-[747px]'>
                        <p className='font-bold text-black font-poppins text-[20px] mt-[30px]'>Make a Reseravtion</p>
                        <div className='w-[250px] mt-[30px] md:mt-[40px] flex flex-col justify-start items-start md:w-[382px]'>
                            <label className='text-[16px] text-black' htmlFor="people">Number of people</label>
                            <select onChange={handleChange} className='w-full border-2 mt-[5px] outline-none h-[39px]' name="people" id="people">
                                {
                                    Array.from({ length: 100 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1} people
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-[250px] mt-[10px] flex flex-row justify-start gap-1 items-start md:w-[382px]'>
                            <div className='w-[290px] flex flex-col justify-start items-start'>
                                <label className='text-[16px] text-black' htmlFor="date">Date</label>
                                <input onChange={handleChange} className='w-full border-2 text-center mt-[5px] outline-none h-[39px]' name="date" type='date' id="date" />
                            </div>
                            <div className='w-[290px] flex flex-col justify-start items-start'>
                                <label className='text-[16px] text-black' htmlFor="time">Time</label>
                                <input onChange={handleChange} className='w-full text-center border-2 mt-[5px] outline-none h-[39px]' type='time' name="time" id="time" />
                            </div>
                        </div>

                        <div className='w-[250px] flex flex-col justify-start items-start md:w-[382px]'>
                            <label className='text-[16px] text-black' htmlFor="special">Any Special Instructions (Optional)</label>
                            <input onChange={handleChange} className='w-full border-2 pr-2 pl-2 mt-[5px] outline-none h-[39px]' type="text" name="special_instructions" id="special" />
                        </div>

                        <Link to={`/booking-confirmation/${Id}`} state={{ Form }} ><button className='bg-[#89231C] md:w-[382px] text-white w-[250px] mt-[5px] rounded-md text-[20px] font-bold font-poppins h-[39px]'>Reserve</button></Link>

                        <div className='w-[250px] mt-[10px] flex flex-col justify-center gap-1 items-center md:w-[382px]'>
                            <div className='w-full flex flex-row items-start justify-start gap-2'>
                                <img src={f} alt="" />
                                <p>Booked 4 times today</p>
                            </div>
                            <p className='font-bold text-black text-center font-poppins text-[20px] mt-[30px]'>Location on Map</p>

                            <div className='w-full'>
                                <MapContainer height={200} />
                            </div>

                        </div>


                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Detailspage