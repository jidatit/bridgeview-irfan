import React, { useState, useRef, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthContext from "./AuthContext";
import { auth } from "./firebase";
import { AuthContextProvider } from "./AuthContext";

// static web pages start
import Navbar from './components/Navbar'
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Contactpage from "./pages/Contactpage";
import SpecialOfferspage from "./pages/SpecialOfferspage";
import Conferencepage from "./pages/Conferencepage";
import Weddingpage from "./pages/Weddingpage";
import Bookaroom from "./pages/Bookaroom";
import Bookatable from "./pages/Bookatable";
import Businessprofilepage from "./pages/Businessprofilepage";
import Bookingconfirm from "./pages/Bookingconfirm";
import Detailspage from "./pages/Detailspage";
import Menu from "./pages/menu";
// static web pages end

// dashboard pages start
import SideNav from "./dashboardcomponents/SideNav";
import StickyTitle from "./dashboardcomponents/StickyTitle";
import Bookings from "./dashboardpages/Bookings";
import SpecialOffers from "./dashboardpages/SpecialOffers";
import Rooms from "./dashboardpages/Rooms";
import Editroom from "./dashboardpages/Editroom";
import Loginpage from "./pages/Loginpage";
import Conferences from "./dashboardpages/Conferences";
import Editconferences from "./dashboardpages/Editconferences";
import Weddings from "./dashboardpages/Weddings";
import Editweddings from "./dashboardpages/Editweddings";
import RestaurantMenu from "./dashboardpages/RestaurantMenu";
// dashboard pages end

function App() {
  const [loading, setLoading] = useState(true);
  const { currentUser, userhere } = useContext(AuthContext)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const ref = useRef(null);
  useEffect(() => {
    ref.current.complete();
  }, []);

  const isDashboardRoute = window.location.pathname.startsWith('/dashboard');

  return (
    <>
      <Router>
        <LoadingBar color="#f11946" ref={ref} />
        {!isDashboardRoute && (<>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/contact' element={<Contactpage />} />
            <Route exact path='/special-offers' element={<SpecialOfferspage />} />
            <Route exact path='/conference' element={<Conferencepage />} />
            <Route exact path='/wedding' element={<Weddingpage />} />
            <Route exact path='/bookaroom' element={<Bookaroom />} />
            <Route exact path='/bookatable' element={<Bookatable />} />
            <Route exact path='/business-profile' element={<Businessprofilepage />} />
            <Route exact path='/booking-confirmation/:Id' element={<Bookingconfirm />} />
            <Route exact path='/details/:Category/:Id' element={<Detailspage />} />
            <Route exact path='/menu/:Id' element={<Menu />} />
            {!userhere && !currentUser && (<Route exact path='/login' element={<Loginpage />} />)}
          </Routes>
          <Footer />
        </>)}


        {isDashboardRoute && userhere && (<div className="fixed left-0 right-0 top-0 bottom-0 flex">
          <SideNav />
          <div className="w-full overflow-x-auto">
            <div className="min-w-full md:min-w-[300px] lg:min-w-full">
              <StickyTitle />
              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Routes>
                    <Route path="/dashboard/bookings" element={<AuthContextProvider><Bookings /></AuthContextProvider>} />
                    <Route path="/dashboard/specialoffers" element={<AuthContextProvider><SpecialOffers /></AuthContextProvider>} />
                    <Route path="/dashboard/restaurant-menus" element={<AuthContextProvider><RestaurantMenu /></AuthContextProvider>} />
                    <Route path="/dashboard/rooms" element={<AuthContextProvider><Rooms /></AuthContextProvider>} />
                    <Route path="/dashboard/rooms/editrooms" element={<AuthContextProvider><Editroom /></AuthContextProvider>} />
                    <Route path="/dashboard/conferences" element={<AuthContextProvider><Conferences /></AuthContextProvider>} />
                    <Route path="/dashboard/conferences/editconferences" element={<AuthContextProvider><Editconferences /></AuthContextProvider>} />
                    {/* <Route path="/dashboard/weddings" element={<AuthContextProvider><Weddings /></AuthContextProvider>} /> */}
                    <Route path="/dashboard/editweddings" element={<AuthContextProvider><Editweddings /></AuthContextProvider>} />
                    <Route path="/dashboard/logout" element={<AuthContextProvider><Logout /></AuthContextProvider>} />
                  </Routes>
                </>
              )}
            </div>
          </div>
        </div>)}
      </Router>
    </>
  )
}

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#1F2634] bg-opacity-75">
        <div className='w-[654px] h-[310px] rounded-lg mt-[40px] flex flex-col gap-[23px] justify-center items-center' style={{ background: "linear-gradient(to right, #1F2634,#1F2634)" }}>
          <p className='font-bold text-white text-3xl text-center'>Are you sure you want to logout?</p>
          <div className='w-[540px] h-[70px] flex flex-row gap-6 justify-center'>
            <button onClick={() => { navigate('/dashboard') }} className='bg-[#BB000E] rounded-md w-[229px] h-[56px] font-bold text-white'>Cancel</button>
            <button onClick={handleLogout} className='bg-[#059C4B] rounded-md w-[229px] h-[56px] font-bold text-white'>Confirm</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
