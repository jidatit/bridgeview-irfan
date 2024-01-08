import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/logo.png"

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const closeNavbar = () => {
        setNavbar(false);
    };
    useEffect(() => {
        const handleResize = () => {
            // Set navbar state to false for screen widths greater than 767px
            if (window.innerWidth > 767) {
                setNavbar(false);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className={`w-full md:fixed z-[100] top-0 left-0 right-0 bg-[#DDC87D]  group shadow ${navbar ? " fixed min-h-screen md:min-h-[auto] h-full" : "fixed"
            } `}>
            <div className="justify-start px-4 mx-auto md:max-w-7xl md:items-center flex md:flex-row flex-col md:px-8 min-h-full ">
                <div>
                    <div className="flex items-center justify-between py-2 md:py-3 md:block">
                        <div className="md:hidden flex items-center gap-3">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black group-hover:text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                            <Link onClick={closeNavbar} to="/" className="">
                                <img className="w-[137px] h-[90px]" src={logo} alt="" />
                            </Link>
                        </div>
                        <div className=" space-x-2 md:hidden flex items-center gap-2">
                            {/* <Link onClick={closeNavbar} to="/login" className=" flex items-center gap-1 rounded-3xl text-[#4F5D75] text-[20px]" >Login</Link> */}

                        </div>
                        <Link onClick={closeNavbar} to="/" className=" md:block hidden">
                            <img className="w-[137px] h-[90px]" src={logo} alt="" />
                        </Link>

                    </div>
                </div>
                <div className="flex flex-1 min-h-full">
                    <div
                        className={` flex-1 justify-between pb-3 mt-8  md:pb-0 md:mt-0 min-h-full  ${navbar ? "flex  flex-col " : "md:block hidden"
                            }`}
                    >
                        <ul className="items-center justify-start pl-8 space-y-8 md:flex md:space-x-6 md:space-y-0 text-black group-hover:text-black text-xs lg:text-[16px] ">
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/special-offers">Special Offers</Link>
                            </li>
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/conference">Conference</Link>
                            </li>
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/bookatable">Restaurant</Link>
                            </li>
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/business-profile">Business Profile</Link>
                            </li>
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/wedding">Weddings</Link>
                            </li>
                            <li>
                                <Link className="text-[16px] hover:font-semibold hover:underline" onClick={closeNavbar} to="/contact">Contact</Link>
                            </li>

                        </ul>

                        <div className="md:hidden space-x-2 py-2 flex flex-col w-full items-center gap-3 text-white">
                            <Link onClick={closeNavbar} to="/bookatable" className=" bg-transparent w-full py-2 text-center px-4 rounded text-[16px] text-black hover:bg-black hover:text-white transition ease-in delay-100 border-2 border-black" >Book a Table</Link>
                            <Link onClick={closeNavbar} to="/bookaroom" className=" bg-[#88211A] w-full text-center py-2 px-4 text-white rounded text-[16px]" >Book a Room</Link>
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 py-2 md:flex items-center gap-1 text-white">
                    <Link onClick={closeNavbar} to="/bookatable" className=" bg-transparent py-2 px-4 rounded text-[16px] text-black hover:bg-black hover:text-white transition ease-in delay-100 border-2 border-black" >Book a Table</Link>
                    <Link onClick={closeNavbar} to="/bookaroom" className=" bg-[#88211A] py-2 px-4 text-white rounded text-[16px]" >Book a Room</Link>
                </div>
            </div>
        </nav>
    );
}