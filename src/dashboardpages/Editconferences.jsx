import React, { useState, useEffect } from 'react'
import dots from "../dashboardassets/sp/dots.png";
import ConferenceEditCard from '../dashboardcomponents/conferencecard/ConferenceEditCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

// let conferenceDataLoop = []
// let r = {}


const Editconferences = () => {
    const [Conferences, setConferences] = useState([]);

    const getConferences = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "conferences"));
            const conferenceDataLoop = []
            querySnapshot.forEach((conference) => {
                const r = {
                    ...conference.data(),
                    id: conference.id
                };
                conferenceDataLoop.push(r);
            });

            setConferences(conferenceDataLoop);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getConferences()
    }, [])

  return (
    <>
    <div className="main bg-[#F1F5F9] min-h-screen md:w-full w-[500px] lg:w-full flex flex-col justify-center items-center">
        <div className="w-full pl-2 pr-2 mb-[50px] items-start lg:items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-18 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center">
            <h1 className='font-semibold md:text-[40px] text-[25px] font-poppins text-black'>Edit Conferences</h1>
            <div className="bg-[#ffffff] w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[970px] 2xl:w-[1120px] p-5 rounded-md">
                <div className="flex flex-row items-center border-b-2 justify-between">
                    <span className="font-bold text-black font-poppins text-2xl mb-2 mt-2 sm:mb-4 sm:mt-4 md:mb-3 md:mt-3 lg:mb-3 lg:mt-3 xl:mb-3 xl:mt-3 2xl:mb-3 2xl:mt-3">Conference Details</span>
                    <img className='w-[34px] h-[10px]' src={dots} alt="" />
                </div>
                <div className='bg-[#ffffff] w-full mt-[50px] mb-[50px] justify-center gap-3 items-center h-[auto] grid grid-cols-1 md:grid-cols-2'>
                    {Conferences?.map((conference) => (
                        <ConferenceEditCard key={conference.id} conferenceData={conference} />
                    ))}
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Editconferences