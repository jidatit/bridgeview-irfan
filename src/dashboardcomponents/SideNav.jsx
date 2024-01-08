import React, { useState, useEffect } from "react";
import LOGO from "../dashboardassets/logo.png"
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { GiVideoConference } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { MdOutlineMenuBook,MdOutlineFestival } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

const SideNav = () => {

  const menus = [
    { name: "Special Offers", link: "/dashboard/specialoffers", icon: BiSolidOffer },
    { name: "Conference Facilities", link: "/dashboard/conferences", icon: GiVideoConference },
    { name: "Rooms", link: "/dashboard/rooms", icon: MdMeetingRoom },
    { name: "Restaurant Menu", link: "/dashboard/restaurant-menus", icon: MdOutlineMenuBook },
    { name: "Wedding Venue", link: "/dashboard/editweddings", icon: MdOutlineFestival },
    { name: "Bookings", link: "/dashboard/bookings", icon: FaBookmark },
    { name: "Logout", link: "dashboard/logout", icon: FiLogOut },
  ];

  // State to manage the open/closed state of the side navigation
  const [open, setOpen] = useState(true);

  // Get the current location using the useLocation hook
  const location = useLocation();

  // Function to update the `open` state based on screen width
  const updateScreenSize = () => {
    if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // Call the `updateScreenSize` function when the component mounts and on window resize
  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <section className="flex">
      <div
        className={` bg-[#1F2634] min-h-screen shadow-md ${open ? "w-72" : " w-14 lg:w-[75px]"
          } duration-500 text-gray-100 px-2 lg:px-4 py-1 sm:py-2 md:py-2 lg:py-4 xl:py-6 2xl:py-6`}
      >
        <div className="py-3 flex justify-center items-center">
          {open && (
            <img className="cursor-pointer unselectable" onClick={() => setOpen(!open)} src={LOGO} alt="" />
          )}
          <img
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            src={LOGO}
            alt=""
            style={{ display: !open ? "block" : "none" }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`group flex items-center text-base gap-3.5 font-poppins ${open && "p-2"} ${location.pathname === menu?.link ? "bg-[rgba(112,127,221,0.1) text-[#ffffff] bg-[#484a55] rounded-md" : "text-white"} hover:bg-[rgba(112,127,221,0.1)] hover:text-[#FFFFFF] rounded-md`}
            >
              <div className="p-2 lg:p-3 rounded-md text-[#ffffff]">
                {React.createElement(menu?.icon, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `${i + 2}00ms`,
                }}
                className={`whitespace-pre duration-200 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <h2 className={`${open && "hidden"} absolute left-48 bg-white font-poppins whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                {menu?.name}
              </h2>
            </Link>
          ))}

        </div>
        <a href="/"><button className="flex items-center absolute bottom-5 md:left-4 justify-center rounded-full bg-gray-700 w-[40px] h-[40px] text-center text-white font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </button></a>
      </div>
    </section>
  );
};

export default SideNav;