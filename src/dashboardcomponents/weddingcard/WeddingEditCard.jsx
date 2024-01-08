import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import c1 from "../../assets/specialofferspage/1.png";
import { db } from '../../firebase';

const WeddingEditCard = ({ weddingData }) => {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedRoomType, setEditedRoomType] = useState(weddingData.wedding_room_number || 'Room Type 1');
    const [editedDescription, setEditedDescription] = useState(weddingData.brief_description_of_venue || 'Description');
    const [editedFromDate, setEditedFromDate] = useState(weddingData.availability_dates ? weddingData.availability_dates.from : '');
    const [editedToDate, setEditedToDate] = useState(weddingData.availability_dates ? weddingData.availability_dates.to : '');
    const [editedPrice, setEditedPrice] = useState(weddingData.price_per_wedding || 'MK200 / Night');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const roomDocRef = doc(db, 'weddings', weddingData.id);

        // Update the document with the edited data
        await setDoc(roomDocRef, {
            wedding_room_number: editedRoomType,
            brief_description_of_venue: editedDescription,
            availability_dates: {
                from: editedFromDate,
                to: editedToDate,
            },
            price_per_wedding: editedPrice,
            // Add other fields as needed
        }, { merge: true });

        setIsEditing(false);
        // You can save the edited data or perform other actions here
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        // Reset the edited data to the original state when canceling
        setIsEditing(false);
        setEditedRoomType(weddingData.wedding_room_number || 'Room Type 1');
        setEditedDescription(weddingData.brief_description_of_venue || "Description")
        setEditedFromDate(weddingData.availability_dates ? weddingData.availability_dates.from : '');
        setEditedToDate(weddingData.availability_dates ? weddingData.availability_dates.to : '');
        setEditedPrice(weddingData.price_per_wedding || 'MK200 / Night');
    };

    const formatDateRange = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);

        const fromMonth = fromDate.toLocaleString('default', { month: 'short' });
        const toMonth = toDate.toLocaleString('default', { month: 'short' });

        return `${fromMonth} ${fromDate.getDate()} - ${toMonth} ${toDate.getDate()}`;
    };

    const handleChange = (type, value) => {
        switch (type) {
            case 'roomType':
                setEditedRoomType(value);
                break;
            case 'description':
                setEditedDescription(value);
                break;
            case 'from':
                setEditedFromDate(value);
                break;
            case 'to':
                setEditedToDate(value);
                break;
            case 'price':
                setEditedPrice(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className='md:w-[450px] w-[290px] flex md:flex-row flex-col gap-3 justify-center items-center'>
            <div className='w-[270px] h-[200px] relative'>
                <img className='w-[270px] h-[200px]' src={weddingData.photos[0] || c1} alt="" />
                <div className='absolute top-2 right-2 w-[30px] hover:bg-[#526fac] transition ease-in-out delay-150 cursor-pointer flex flex-col justify-center items-center text-white h-[30px] bg-[#1f242f] rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
            </div>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <p className='font-medium text-[17px] text-black'>
                        {isEditing ? (
                            <input
                                type='text'
                                value={editedRoomType}
                                onChange={(e) => handleChange('roomType', e.target.value)}
                                className='w-full px-1 border border-gray-300 rounded'
                            />
                        ) : (
                            truncateText(editedRoomType, 20)
                        )}
                    </p>
                    <p className='font-medium text-black'>⭐ (5.0)</p>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-[20] text-black font-semibold'>
                    {isEditing ? (
                        <input
                            type='text'
                            value={editedDescription}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className='w-full px-1 border border-gray-300 rounded'
                        />
                    ) : (
                        truncateText(editedDescription, 35)
                    )}
                </p>
                </div>
                {/* <p className='text-black'>{truncateText(weddingData.brief_description_of_venue, 35)}</p> */}
                <p className='w-full text-start font-light text-black text-[17px]'>
                    {isEditing ? (
                        <>
                            <input
                                type='date'
                                value={editedFromDate}
                                onChange={(e) => handleChange('from', e.target.value)}
                                className='w-full px-1 border border-gray-300 rounded mr-1'
                                placeholder='From'
                            />
                            <input
                                type='date'
                                value={editedToDate}
                                onChange={(e) => handleChange('to', e.target.value)}
                                className='w-full px-1 border border-gray-300 rounded'
                                placeholder='To'
                            />
                        </>
                    ) : (
                        <>
                            <span>{formatDateRange(editedFromDate, editedToDate)}</span>
                        </>
                    )}
                </p>
                <div className='w-full flex flex-col justify-between items-start'>
                    <p className='text-[20] text-black font-semibold'>
                        {isEditing ? (
                            <input
                                type='text'
                                value={editedPrice}
                                onChange={(e) => handleChange('price', e.target.value)}
                                className='w-full px-1 border border-gray-300 rounded'
                            />
                        ) : (
                            truncateText(editedPrice, 9) + "MK / Event"
                        )}
                    </p>
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick} className='mr-2 text-[#3D881A] font-semibold'>
                                Save
                            </button>
                            <button onClick={handleCancelClick} className='text-[#88211A] font-semibold'>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className='w-[108px] rounded-md h-[43px] bg-[#1C2434] text-white'
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeddingEditCard;
