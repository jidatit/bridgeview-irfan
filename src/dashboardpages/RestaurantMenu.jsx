import React, { useState, useEffect } from 'react'
import dots from "../dashboardassets/sp/dots.png";
import { db, storage } from '../firebase';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // p

const RestaurantMenu = () => {

    const [FirstMenus, setFirstMenus] = useState([]);
    const [SecondMenus, setSecondMenus] = useState([]);

    const getAllMenus = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "restaurant-menus"));
            const menuDataLoop = []
            const menuDataLoop2 = []
            querySnapshot.forEach((menu) => {
                const r = {
                    ...menu.data(),
                    id: menu.id
                };
                if (r.restaurant_name === "Lemon & Spice Restaurant") {
                    menuDataLoop.push(r);
                }
                else {
                    menuDataLoop2.push(r)
                }
            });
            setFirstMenus(menuDataLoop)
            setSecondMenus(menuDataLoop2)
        } catch (error) {
            console.log(error);
        }
    }

    const updateMenu = async (id) => {
        try {
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = 'image/*'; // Allow only image files
            inputElement.multiple = false; // Allow only one file

            inputElement.addEventListener('change', async (event) => {
                const file = event.target.files[0];

                if (file) {
                    // Upload the file to storage
                    const storageRef = ref(storage, `restaurantMenuImages/${file.name}`);
                    await uploadBytes(storageRef, file);

                    // Get the download URL of the uploaded file
                    const downloadURL = await getDownloadURL(storageRef);

                    // Update the menu object in Firestore with the new photo URL
                    const docRef = doc(db, "restaurant-menus", id);
                    const docSnap = await getDoc(docRef);
                    const menuToUpdate = docSnap.data();

                    const updatedMenu = {
                        ...menuToUpdate,
                        photo: downloadURL,
                    };

                    await updateDoc(docRef, updatedMenu);
                    await getAllMenus()
                }
            });

            inputElement.click();

        } catch (error) {
            console.log(error);
        }
    };


    const DeleteMenu = async (id) => {
        try {
            const docRef = doc(db, "restaurant-menus", id)
            const docSnap = await getDoc(docRef)
            const menutobe = docSnap.data()
            const updatedMenu = {
                ...menutobe,
                photo: "",
            };
            await updateDoc(docRef, updatedMenu);
            await getAllMenus()
        } catch (error) {
            console.error
        }
    }

    useEffect(() => {
        getAllMenus()
    }, [])

    return (
        <>
            <div className="main bg-[#F1F5F9] min-h-screen md:w-full w-[500px] lg:w-full flex flex-col justify-center items-center">
                <div className="w-full pl-2 pr-2 mb-[50px] items-start lg:items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-18 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center">
                    <h1 className='font-semibold md:text-[40px] text-[25px] font-poppins text-black'>Manage Restaurant Menus</h1>
                    <div className="bg-[#ffffff] w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[970px] 2xl:w-[1120px] p-5 rounded-md">
                        <div className="flex flex-row items-center border-b-2 justify-between">

                            <nav className="flex font-bold text-black font-poppins text-2xl mb-2 mt-2 sm:mb-4 sm:mt-4 md:mb-3 md:mt-3 lg:mb-3 lg:mt-3 xl:mb-3 xl:mt-3 2xl:mb-3 2xl:mt-3" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                            </svg>
                                            Restaurant Menu
                                        </a>
                                    </li>
                                </ol>
                            </nav>

                            <img className='w-[34px] h-[10px]' src={dots} alt="" />
                        </div>
                        <h1 className='font-semibold mt-[30px] md:text-[30px] text-[25px] text-center font-poppins text-black'>Manage City Cafe Menus</h1>
                        <div className='bg-[#ffffff] w-full mt-[50px] mb-[50px] justify-center gap-3 items-center h-[auto] flex flex-col md:flex-row'>
                            {FirstMenus ? (FirstMenus?.map((menu) =>
                            (
                                <div key={menu.id} style={{ backgroundImage: `url(${menu.photo})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='z-[10] relative w-[220px] h-[380px] bg-[#1C2434] transition ease-in-out delay-400 hover:bg-[#000000] flex flex-col justify-center items-center' >
                                    <div className='w-full h-full bg-black opacity-20 absolute top-0 z-[11]'></div>
                                    <p className='text-[20px] font-bold text-[#f78909] z-[12]'>{menu.category || "Breakfast"}</p>
                                    <button onClick={() => { updateMenu(menu.id) }} className='mt-[20px] bg-blue-600  hover:bg-blue-400 transition ease-in-out delay-100 rounded-md px-3 py-2 text-white font-bold text-[13px] z-[12]'>Update</button>
                                    <button onClick={() => { DeleteMenu(menu.id) }} className='bg-red-600 rounded-md px-4 mt-[5px] hover:bg-red-400 transition ease-in-out delay-100 py-2 text-white font-bold text-[13px] z-[12]'>Delete</button>
                                </div>
                            ))) : (<p className='text-center'>No Menu Found</p>)}
                        </div>
                            <h1 className='font-semibold md:text-[30px] text-[25px] font-poppins text-center text-black'>Manage Lemon & Spice Restaurant Menus</h1>
                        <div className='bg-[#ffffff] w-full mt-[50px] mb-[50px] justify-center gap-3 items-center h-[auto] flex flex-col md:flex-row'>
                            {SecondMenus ? (SecondMenus?.map((menu) =>
                            (
                                <div key={menu.id} style={{ backgroundImage: `url(${menu.photo})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='z-[10] relative w-[220px] h-[380px] bg-[#1C2434] transition ease-in-out delay-400 hover:bg-[#000000] flex flex-col justify-center items-center' >
                                    <div className='w-full h-full bg-black opacity-20 absolute top-0 z-[11]'></div>
                                    <p className='text-[20px] font-bold text-[#f78909] z-[12]'>{menu.category || "Breakfast"}</p>
                                    <button onClick={() => { updateMenu(menu.id) }} className='mt-[20px] bg-blue-600  hover:bg-blue-400 transition ease-in-out delay-100 rounded-md px-3 py-2 text-white font-bold text-[13px] z-[12]'>Update</button>
                                    <button onClick={() => { DeleteMenu(menu.id) }} className='bg-red-600 rounded-md px-4 mt-[5px] hover:bg-red-400 transition ease-in-out delay-100 py-2 text-white font-bold text-[13px] z-[12]'>Delete</button>
                                </div>
                            ))) : (<p className='text-center'>No Menu Found</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantMenu