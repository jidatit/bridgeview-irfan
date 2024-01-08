import React, { useState, useEffect } from 'react'
import homesection from "../assets/homepage/1.png"
import par1 from "../assets/homepage/par1.png"
import par2 from "../assets/homepage/par2.png"
import par3 from "../assets/homepage/par3.png"
import par4 from "../assets/homepage/par4.png"
import par5 from "../assets/homepage/par5.png"
import c from "../assets/homepage/c.png"
import o1 from "../assets/homepage/o1.png"
import o2 from "../assets/homepage/o2.png"
import o3 from "../assets/homepage/o3.png"
import Customer from '../components/cards/customer'
import { Link } from 'react-router-dom'
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import Roomcard from "../components/cards/roomcard"
import Cardloader from '../components/cards/cardloader'

const cardStyle = {
  backgroundImage: `url(${homesection})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const Homepage = () => {
  const [Rooms, setRooms] = useState();
  const [isloading, setisloading] = useState(true);


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
      setisloading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRooms();
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[#F1F5F9]">
        <div className="headsection mt-[100px] h-[940px] lg:h-[652px] w-full flex flex-col justify-center gap-12 items-center"
          style={cardStyle}>
          <h1 className='text-[36px] font-semibold text-white  md:tracking-widest text-center'>Find your perfect Experience</h1>
          <h1 className='text-[20px] w-[290px] md:w-[700px] font-poppins text-white text-center'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h1>
          <div className='flex md:flex-row flex-col gap-5 justify-center items-center'>
            <Link to="/bookatable"><button className='w-[153px] h-[43px] text-white text-[16px] bg-[#333333] rounded-md'>Book a Table</button></Link>
            <Link to="/bookaroom"><button className='w-[153px] h-[43px] text-white text-[16px] bg-[#88211A] rounded-md'>Book a Room</button></Link>
          </div>
        </div>

        <div id='categories' className='flex w-full flex-col justify-center items-center'>

          <div className='flex w-full mt-[50px] mb-[50px] flex-col justify-center items-center'>
            <h1 className='text-[36px] font-semibold text-[#88211A] text-center'>Explore Our Rooms</h1>
            <div className='w-[300px] md:w-[1150px] md:gap-0 gap-10 mt-[50px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>

            {isloading ? (
                <>
                  <Cardloader key={1} />
                  <Cardloader key={2} />
                  <Cardloader key={3} />
                </>
              ) : (
                <>
                  {Rooms?.length >= 3 ? (
                    Rooms?.slice(0,3).map((room) => (
                      <Link key={room.id} to={`/details/rooms/${room.id}`} >
                        <Roomcard key={room.id} room={room} />
                      </Link>
                    ))
                  ) : (
                    <>
                      {/* Room card 1 */}
                      <div key={1} className='w-[290px] md:w-[360px] rounded-md'>
                        <img className='w-full rounded-t-md' src={c} alt='' />
                        <div className='mt-3'>
                          <div className='flex flex-row justify-between items-center'>
                            <p className='text-black font-poppins font-medium text-[18px]'>Room type 1</p>
                            <p className='text-black font-medium'>⭐ (5.0)</p>
                          </div>
                          <p className='text-black text-[16px] font-light'>Oct 20 - 28</p>
                          <p className='text-black text-[16px]'>MK200 / Night</p>
                        </div>
                      </div>

                      {/* Room card 2 */}
                      <div  key={2} className='w-[290px] md:w-[360px] rounded-md'>
                        <img className='w-full rounded-t-md' src={c} alt='' />
                        <div className='mt-3'>
                          <div className='flex flex-row justify-between items-center'>
                            <p className='text-black font-poppins font-medium text-[18px]'>Room type 1</p>
                            <p className='text-black font-medium'>⭐ (5.0)</p>
                          </div>
                          <p className='text-black text-[16px] font-light'>Oct 20 - 28</p>
                          <p className='text-black text-[16px]'>MK200 / Night</p>
                        </div>
                      </div>

                      {/* Room card 3 */}
                      <div key={3} className='w-[290px] md:w-[360px] rounded-md'>
                        <img className='w-full rounded-t-md' src={c} alt='' />
                        <div className='mt-3'>
                          <div className='flex flex-row justify-between items-center'>
                            <p className='text-black font-poppins font-medium text-[18px]'>Room type 1</p>
                            <p className='text-black font-medium'>⭐ (5.0)</p>
                          </div>
                          <p className='text-black text-[16px] font-light'>Oct 20 - 28</p>
                          <p className='text-black text-[16px]'>MK200 / Night</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

            </div>
          </div>

          <div className="h-[1600px] lg:h-[700px] w-full flex flex-col justify-center gap-3 items-center bg-[#88211A]">
            <h1 className='text-[36px] font-semibold text-white text-center'>What we have to Offer</h1>
            <div className='w-[300px] md:w-[1150px] md:gap-0 gap-10 mt-[50px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <img className='rounded-sm' src={o1} alt="" />
                <h1 className='text-[28px] font-semibold text-white text-center'>Restaurant</h1>
              </div>
              <div className='flex flex-col justify-center items-center gap-3'>
                <img className='rounded-sm' src={o2} alt="" />
                <h1 className='text-[28px] font-semibold text-white text-center'>Conference</h1>
              </div>
              <div className='flex flex-col justify-center items-center gap-3'>
                <img className='rounded-sm' src={o3} alt="" />
                <h1 className='text-[28px] font-semibold text-white text-center'>Weddings</h1>
              </div>
            </div>
          </div>

          <div className='flex w-full mt-[50px] mb-[50px] flex-col justify-center items-center'>
            <h1 className='text-[24px] text-black font-semibold lg:text-[36px] text-center'>Our Partners</h1>
          </div>
          <div className='lg:w-[1180px] mb-[50px] rounded-3xl shadow-2xl bg-white lg:h-[222px] h-[850px] flex lg:flex-row flex-col gap-2 items-center justify-evenly'>
            <img src={par1} alt="" />
            <img src={par2} alt="" />
            <img src={par3} alt="" />
            <img src={par4} alt="" />
            <img src={par5} alt="" />
            <p className='text-black italic lg:mr-0 lg:ml-0 pr-[10px] pl-[10px]'>Trusted by 1000+ Companies worldwide</p>
          </div>


          <div className='flex w-full mt-[50px] mb-[50px] flex-col justify-center items-center'>
            <h1 className='text-[24px] text-black font-semibold lg:text-[36px] text-center'>Testimonials</h1>
            <div className='grid lg:w-[1100px] mt-[50px] gap-10 mb-[50px] lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
              <Customer />
              <Customer />
              <Customer />
            </div>
          </div>

         

        </div >
      </div >
    </>
  )
}

export default Homepage