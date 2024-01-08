import React, { useEffect, useState } from 'react';
import dots from "../dashboardassets/sp/dots.png";
import { addDoc, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
// import { storage } from '../firebase';   // p
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // p

const SpecialOffers = () => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [crumb, setcrumb] = useState('');
    const [iscrumbshown, setiscrumbshown] = useState(false);



    const openForm = (box) => {
        setiscrumbshown(true)
        setSelectedBox(box);
    };

    const closeForm = () => {
        setSelectedBox(null);
        setiscrumbshown(false)
        setcrumb('')
    };

    const renderForm = () => {
        switch (selectedBox) {
            case 'Restaurant':
                return <RestaurantForm closeForm={closeForm} setcrumb={setcrumb} />;
            case 'Wedding':
                return <WeddingForm closeForm={closeForm} setcrumb={setcrumb} />;
            case 'Rooms':
                return <RoomsForm closeForm={closeForm} setcrumb={setcrumb} />
            case 'Conference':
                return <ConferenceForm closeForm={closeForm} setcrumb={setcrumb} />
            default:
                return null;
        }
    };

    return (
        <>
            <div className="main bg-[#F1F5F9] min-h-screen md:w-full w-[500px] lg:w-full flex flex-col justify-center items-center">
                <div className="w-full pl-2 pr-2 mb-[50px] items-start lg:items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-18 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center">
                    <h1 className='font-semibold md:text-[40px] text-[25px] font-poppins text-black'>Special Offers and Discounts</h1>
                    <div className="bg-[#ffffff] w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[970px] 2xl:w-[1120px] p-5 rounded-md">
                        <div className="flex flex-row items-center border-b-2 justify-between">


                            <nav className="flex font-bold text-black font-poppins text-2xl mb-2 mt-2 sm:mb-4 sm:mt-4 md:mb-3 md:mt-3 lg:mb-3 lg:mt-3 xl:mb-3 xl:mt-3 2xl:mb-3 2xl:mt-3" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                            </svg>
                                            Special Offers
                                        </a>
                                    </li>
                                    {iscrumbshown && (<li>
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{crumb}</a>
                                        </div>
                                    </li>)}
                                </ol>
                            </nav>




                            <img className='w-[34px] h-[10px]' src={dots} alt="" />
                        </div>
                        {
                            selectedBox === null ? (
                                <div className='bg-[#ffffff] w-full mt-[50px] mb-[50px] justify-center gap-3 items-center h-[auto] flex flex-col md:flex-row'>
                                    <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center' onClick={() => openForm('Restaurant')}>
                                        <p className='text-[20px] text-white'>Restaurant</p>
                                    </div>
                                    <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center' onClick={() => openForm('Wedding')}>
                                        <p className='text-[20px] text-white'>Wedding</p>
                                    </div>
                                    <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center' onClick={() => openForm('Rooms')}>
                                        <p className='text-[20px] text-white'>Rooms</p>
                                    </div>
                                    <div className='w-[196px] h-[160px] bg-[#1C2434] transition ease-in-out delay-400  cursor-pointer hover:bg-[#000000] flex flex-col justify-center items-center' onClick={() => openForm('Conference')}>
                                        <p className='text-[20px] text-white'>Conference</p>
                                    </div>
                                </div>
                            ) : (
                                renderForm()
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

const RestaurantForm = ({ closeForm, setcrumb }) => {

    const [Form, setForm] = useState({
        restaurant: '',
        validity_dates: {
            from: '',
            to: ''
        },
        discount_percentage: '',
        offer_type: 'Restaurants',
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
            const docSnap = await addDoc(collection(db, "special_offers"), {
                restaurant: Form.restaurant,
                validity_dates: Form.validity_dates,
                discount_percentage: Form.discount_percentage,
                offer_type: 'Restaurants',
            })
            // if (docSnap) {
            //     console.log("res added.")
            // }
        } catch (error) {
            console.log(error)
        }
    }

    const saveChanges = () => {
        addtodb()
        closeForm();
    };

    const [Options, setOptions] = useState([]);


    const getOffer = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "restaurant-menus"));
            const data = [];
            querySnapshot.forEach((doc) => {
                const d = {
                    name: doc.data().restaurant_name,
                    id: doc.id
                };
                data.push(d);
            });
            setOptions(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        setcrumb('Restaurant')
        getOffer()
    }, [])
    return (
        <form className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Restaurant</label>
            <select onChange={handleChange} type="text" name='restaurant' className="mt-1 p-2 w-full border rounded-md" >
                <option selected={true} disabled={true} value="">Select an option</option>
                {Array.from(new Set(Options.map(option => option.name))).map((uniqueName, index) => (
                    <option key={index} value={uniqueName}>{uniqueName}</option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-700">Dates for offer Validity</label>
            <label className="block mt-4 text-sm font-medium text-gray-700">From</label>
            <input onChange={handleChange} type="date" name='validity_dates.from' className="mt-1 p-2 w-full border rounded-md" />
            <label className="block mt-4 text-sm font-medium text-gray-700">To</label>
            <input onChange={handleChange} type="date" name='validity_dates.to' className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Special offer discount</label>
            <input onChange={handleChange} type="number" step={0.1} name='discount_percentage' className="mt-1 p-2 w-full border rounded-md" />

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

const WeddingForm = ({ closeForm, setcrumb }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const [Options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [inputDiscount, setInputDiscount] = useState('');


    const [Form, setForm] = useState({
        wedding_venue: '',
        validity_dates: {
            from: '',
            to: ''
        },
        price_per_event: '',
        offer_type: 'Weddings',
    });

    const handleSelection = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        const selectedOption = Options.find((option) => option.name === value);
        if (selectedOption) {
            setForm({
                ...Form,
                wedding_venue: selectedOption
            })
            setSelectedId(selectedOption.id)
        }
    };

    async function getPriceafterDiscount(id, discount) {
        try {
            const docRef = doc(db, "weddings", id);
            const docSnap = await getDoc(docRef);
            const price = docSnap.data().price_per_wedding;
            const d = price - (parseInt(price) * parseInt(discount) / 100);
            return d.toString()
        } catch (error) {
            console.log('Error in getPriceafterDiscount:', error);
        }
    }


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
            const discounted = await getPriceafterDiscount(selectedId, inputDiscount);
            const docSnap = await addDoc(collection(db, "special_offers"), {
                wedding_venue: Form.wedding_venue.name,
                validity_dates: Form.validity_dates,
                price_per_event: discounted,
                discount_percentage:inputDiscount,
                entity_id: selectedId,
                offer_type: 'Weddings',
            });

            // if (docSnap) {
            //     console.log("wed added.");
            // }
        } catch (error) {
            console.error(error);
        }
    };

    const saveChanges = async () => {
        addtodb()
        closeForm();
    };

    const getOffer = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "weddings"));
            const data = [];
            querySnapshot.forEach((doc) => {
                const d = {
                    name: doc.data().wedding_room_number,
                    id: doc.id
                };
                data.push(d);
            });
            setOptions(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setcrumb('Wedding')
        getOffer()
    }, [])
    return (
        <form className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select the Wedding Venue</label>

            <select onChange={handleSelection} value={selectedValue} type="text" name='wedding_venue' className="mt-1 p-2 w-full border rounded-md" >
                <option selected={true} disabled={true} value="">Select an option</option>
                {Array.from(new Set(Options.map(option => option.name))).map((uniqueName, index) => (
                    <option key={index} value={uniqueName}>{uniqueName}</option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-700">Dates for offer Validity</label>
            <label className="block mt-4 text-sm font-medium text-gray-700">From</label>
            <input onChange={handleChange} type="date" name='validity_dates.from' className="mt-1 p-2 w-full border rounded-md" />
            <label className="block mt-4 text-sm font-medium text-gray-700">To</label>
            <input onChange={handleChange} type="date" name='validity_dates.to' className="mt-1 p-2 w-full border rounded-md" />

            <label className="block mt-4 text-sm font-medium text-gray-700">Special offer discount</label>
            <input onChange={(e) => setInputDiscount(e.target.value)} type="number" step={0.1} name='price_per_event' className="mt-1 p-2 w-full border rounded-md" />

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

const RoomsForm = ({ closeForm, setcrumb }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const [Options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [inputDiscount, setInputDiscount] = useState('');

    const handleSelection = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        const selectedOption = Options.find((option) => option.name === value);
        if (selectedOption) {
            setForm({
                ...Form,
                room_type: selectedOption
            })
            setSelectedId(selectedOption.id)
        }
    };

    async function getPriceafterDiscount(id, discount) {
        try {
            const docRef = doc(db, "rooms", id);
            const docSnap = await getDoc(docRef);
            const price = docSnap.data().price_single;
            const d = price - (parseInt(price) * parseInt(discount) / 100);
            return d.toString()
        } catch (error) {
            console.log('Error in getPriceafterDiscount:', error);
        }
    }

    const [Form, setForm] = useState({
        room_type: '',
        validity_dates: {
            from: '',
            to: ''
        },
        price_per_event: '',
        offer_type: 'Rooms',
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
            const discounted = await getPriceafterDiscount(selectedId, inputDiscount);
            const docSnap = await addDoc(collection(db, "special_offers"), {
                room_type: Form.room_type.name,
                validity_dates: Form.validity_dates,
                price_per_event: discounted,
                discount_percentage:inputDiscount,
                entity_id: selectedId,
                offer_type: 'Rooms',
            })
            // if (docSnap) {
            //     console.log("rooms added.")
            // }
        } catch (error) {
            console.log(error)
        }
    }

    const saveChanges = () => {
        addtodb()
        closeForm();
    };

    const getOffer = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "rooms"));
            const data = [];
            querySnapshot.forEach((doc) => {
                const d = {
                    name: doc.data().room_type,
                    id: doc.id
                };
                data.push(d);
            });
            setOptions(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setcrumb('Rooms')
        getOffer()
    }, [])
    return (
        <form className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select the rooms</label>
            <select onChange={handleSelection} value={selectedValue} type="text" name='room_type' className="mt-1 p-2 w-full border rounded-md" >
                <option selected={true} disabled={true} value="">Select an option</option>
                {Array.from(new Set(Options.map(option => option.name))).map((uniqueName, index) => (
                    <option key={index} value={uniqueName}>{uniqueName}</option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-700">Dates for offer Validity</label>
            <label className="block mt-4 text-sm font-medium text-gray-700">From</label>
            <input onChange={handleChange} type="date" name='validity_dates.from' className="mt-1 p-2 w-full border rounded-md" />
            <label className="block mt-4 text-sm font-medium text-gray-700">To</label>
            <input onChange={handleChange} type="date" name='validity_dates.to' className="mt-1 p-2 w-full border rounded-md" />

           <label className="block mt-4 text-sm font-medium text-gray-700">Special offer discount</label>
            <input onChange={(e) => setInputDiscount(e.target.value)} type="number" step={0.1} name='price_per_event' className="mt-1 p-2 w-full border rounded-md" />

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

const ConferenceForm = ({ closeForm, setcrumb }) => {

    
    const [selectedValue, setSelectedValue] = useState('');
    const [Options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [inputDiscount, setInputDiscount] = useState('');

    const handleSelection = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        const selectedOption = Options.find((option) => option.name === value);
        if (selectedOption) {
            setForm({
                ...Form,
                conference_venue: selectedOption
            })
            setSelectedId(selectedOption.id)
        }
    };

    // async function getPriceafterDiscount(id, discount) {
    //     try {
    //         const docRef = doc(db, "conferences", id);
    //         const docSnap = await getDoc(docRef);
    //         const price = docSnap.data().price;
    //         const d = price - (parseInt(price) * parseInt(discount) / 100);
    //         return d.toString()
    //     } catch (error) {
    //         console.log('Error in getPriceafterDiscount:', error);
    //     }
    // }

    const [Form, setForm] = useState({
        conference_venue: '',
        validity_dates: {
            from: '',
            to: ''
        },
        price_per_event: '',
        offer_type: 'Conferences',
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
            // const discounted = await getPriceafterDiscount(selectedId, inputDiscount);
            const docSnap = await addDoc(collection(db, "special_offers"), {
                conference_venue: Form.conference_venue.name,
                validity_dates: Form.validity_dates,
                // price_per_event: discounted,
                discount_percentage:inputDiscount,
                entity_id: selectedId,
                offer_type: 'Conferences',
            })
            // if (docSnap) {
            //     console.log("conference added.")
            // }
        } catch (error) {
            console.log(error)
        }
    }

    const saveChanges = () => {
        addtodb()
        closeForm();
    };

    const getOffer = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "conferences"));
            const data = [];
            querySnapshot.forEach((doc) => {
                const d = {
                    name: doc.data().name,
                    id: doc.id
                };
                data.push(d);
            });
            setOptions(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setcrumb('Conference')
        getOffer()
    }, [])
    return (
        <form className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select the Conference Venue</label>
            <select onChange={handleSelection} value={selectedValue} type="text" name='conference_venue' className="mt-1 p-2 w-full border rounded-md" >
                <option selected={true} disabled={true} value="">Select an option</option>
                {Array.from(new Set(Options.map(option => option.name))).map((uniqueName, index) => (
                    <option key={index} value={uniqueName}>{uniqueName}</option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-700">Dates for offer Validity</label>
            <label className="block mt-4 text-sm font-medium text-gray-700">From</label>
            <input onChange={handleChange} type="date" name='validity_dates.from' className="mt-1 p-2 w-full border rounded-md" />
            <label className="block mt-4 text-sm font-medium text-gray-700">To</label>
            <input onChange={handleChange} type="date" name='validity_dates.to' className="mt-1 p-2 w-full border rounded-md" />

           <label className="block mt-4 text-sm font-medium text-gray-700">Special offer discount</label>
            <input onChange={(e) => setInputDiscount(e.target.value)} type="number" step={0.1} name='price_per_event' className="mt-1 p-2 w-full border rounded-md" />

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

export default SpecialOffers;
