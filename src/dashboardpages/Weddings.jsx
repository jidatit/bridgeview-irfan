import React, { useState } from 'react';
import dots from "../dashboardassets/sp/dots.png";
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { storage } from '../firebase';   // p
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // p

const Weddings = () => {
    const [selectedBox, setSelectedBox] = useState(null);

    const openForm = (box) => {
        setSelectedBox(box);
    };

    const closeForm = () => {
        setSelectedBox(null);
    };

    const renderForm = () => {
        switch (selectedBox) {
            case 'Wedding':
                return <WeddingForm closeForm={closeForm} />
            default:
                return null;
        }
    };
    return (
        <>
            <div className="main bg-[#F1F5F9] min-h-screen md:w-full w-[500px] lg:w-full flex flex-col justify-center items-center">
                <div className="w-full pl-2 pr-2 mb-[50px] items-start lg:items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-18 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center">
                    <h1 className='font-semibold md:text-[40px] text-[25px] font-poppins text-black'>Weddings</h1>
                    <div className="bg-[#ffffff] w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[970px] 2xl:w-[1120px] p-5 rounded-md">
                        <div className="flex flex-row items-center border-b-2 justify-between">
                            <span className="font-bold text-black font-poppins text-2xl mb-2 mt-2 sm:mb-4 sm:mt-4 md:mb-3 md:mt-3 lg:mb-3 lg:mt-3 xl:mb-3 xl:mt-3 2xl:mb-3 2xl:mt-3">Wedding Details</span>
                            <img className='w-[34px] h-[10px]' src={dots} alt="" />
                        </div>
                        <p className='font-semibold md:text-[20px] text-[15px] mt-[50px] text-center font-poppins text-black'>Add a new wedding venue or edit previous one</p>
                        {
                            selectedBox === null ? (
                                <div className='bg-[#ffffff] w-full mt-[50px] mb-[50px] justify-center gap-3 items-center h-[auto] flex flex-col md:flex-row'>
                                    {/* <Link to="/dashboard/weddings/editweddings"> */}
                                        <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center'>
                                        <p className='text-[20px] text-white text-center'>Edit Wedding venue</p>
                                    </div>
                                    {/* </Link> */}
                                    {/* <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center' onClick={() => openForm('Wedding')}>
                                        <p className='text-[20px] text-white text-center'>Add Wedding venue</p>
                                    </div> */}
                                </div>
                            ) : (
                                renderForm()
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const WeddingForm = ({ closeForm }) => {

    const [Form, setForm] = useState({
        wedding_room_number: '',
        availability_dates: {
            from:'',
            to:''
        },
        price_per_wedding: '',
        brief_description_of_venue: '',
        detailed_description_of_venue: '',
        photos: [], // p
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevFormData) => {
            const newFormData = { ...prevFormData };
            const keys = name.split('.');
            let currentRef = newFormData;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (i === keys.length - 1) {
                    currentRef[key] = value;
                } else {
                    currentRef[key] = currentRef[key] || {};
                    currentRef = currentRef[key];
                }
            }

            return newFormData;
        });
    }

    const addtodb = async () => {
        try {
            let imagesUrl = []; //p

            await Promise.all(   //p
                Form.photos.map(async (photo) => {
                    const file = photo;
                    const storageRef = ref(storage, `weddingImages/${file.name}`);

                    try {
                        await uploadBytes(storageRef, file);
                        const downloadURL = await getDownloadURL(storageRef);
                        imagesUrl.push(downloadURL);
                    } catch (error) {
                        console.error("Error uploading image:", error);
                    }
                }))
            const docSnap = await addDoc(collection(db, "weddings"), {
                wedding_room_number: Form.wedding_room_number,
                availability_dates: Form.availability_dates,
                price_per_wedding: Form.price_per_wedding,
                brief_description_of_venue: Form.brief_description_of_venue,
                detailed_description_of_venue: Form.detailed_description_of_venue,
                photos: imagesUrl // p
            })
            // if (docSnap) {
            //     console.log("new wedding venue added.", Form)
            // }
        } catch (error) {
            console.log(error)
        }
    }


    const saveChanges = () => {
        addtodb()
        closeForm();
    };

    const handleFileChange = (event) => {   // p
        const files = Array.from(event.target.files);

        // Update the state to include the array of photos
        setForm({
            ...Form,
            photos: files,
        });
    };

    return (
        <form className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Enter Wedding room number</label>
            <input onChange={handleChange} name='wedding_room_number' type="text" className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Availability Dates</label>
            <label className="block mt-4 text-sm font-medium text-gray-700">From</label>
            <input onChange={handleChange} type="date" name='availability_dates.from' className="mt-1 p-2 w-full border rounded-md" />
            <label className="block mt-4 text-sm font-medium text-gray-700">To</label>
            <input onChange={handleChange} type="date" name='availability_dates.to' className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Price per wedding</label>
            <input onChange={handleChange} name='price_per_wedding' type="text" className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Brief description of conference venue</label>
            <input onChange={handleChange} name='brief_description_of_venue' type="text" className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Detailed</label>
            <textarea onChange={handleChange} name='detailed_description_of_venue' className="mt-1 p-2 w-full border max-h-32 rounded-md"></textarea>

            <label className="block mt-4 text-sm font-medium text-gray-700">Wedding venue Photos</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 p-2 w-full border rounded-md"
                multiple // Allow selecting multiple files
            />

            <div className="overflow-x-auto max-w-full">
                <div id="thumbnails" className="flex space-x-2">
                    {Form.photos?.map((file, index) => (
                        <img
                            key={index}
                            className="h-10"
                            src={URL.createObjectURL(file)}
                            alt={`Thumbnail ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-[#88211A] text-white rounded-md focus:outline-none"
                    onClick={closeForm}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-[#3D881A] text-white rounded-md focus:outline-none"
                    onClick={saveChanges}
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default Weddings


