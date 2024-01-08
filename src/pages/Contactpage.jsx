import React,{useState} from 'react'
import c1 from "../assets/contactpage/1.png"
import c2 from "../assets/contactpage/2.png"
import MapContainer from "../components/MapContainer"
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contactpage = () => {

    const [ButtonText, setButtonText] = useState('Send');
    
    const sendEmail = (event) => {

        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
    
        if (!name || !email || !phoneNumber || !message) {
          setButtonText("Fill out first!")
          return;
        }
    
        const templateParams = {
          from_name: name,
          to_name: "Support",
          from_email: email,
          from_phone: phoneNumber,
          message: message,
        };
        setButtonText('Sending...');
        emailjs
          .send('service_yn8qom5', 'template_hpeoejp', templateParams, "YjIyFrhcYaKSBec8s")
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setButtonText('Send');
            toast.success('Contact Inquiry Successfully Sent!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
          })
          .catch((err) => {
            console.log('FAILED...', err);
            setButtonText('Error, Try again!');
          });
      }
    
    return (
        <>
            <div className="min-h-screen w-full flex flex-col justify-center items-center">

                <div className='w-[95%] md:w-[90%] lg:w-[75%] shadow-2xl rounded-md mt-[200px] mb-[50px] h-[681px] flex flex-row justify-center items-center'>
                    <img className='md:block hidden' src={c1} alt="Image" />
                    <div className="flex-1 p-6">
                        <form className="bg-white px-8 pt-6 pb-8 mb-4">

                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </div>


                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                />
                            </div>


                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="number"
                                    placeholder="Your Phone"
                                />
                            </div>

                            <div className="mb-4">
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y h-56 max-h-96"
                                    id="message"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>




                            <div className="flex items-center justify-between">
                                <button
                                onClick={sendEmail}
                                    className="bg-[#88211A] w-[224px] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    {ButtonText||"Send"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
                <div className='w-[95%] md:w-[90%] lg:w-[75%] rounded-md mt-[200px] mb-[100px] h-[681px] flex flex-row justify-center items-center'>
                    <img className='md:block hidden w-[550px] h-[772px]' src={c2} alt="Image" />
                    <div className="flex-1">
                        <form className="bg-white md:pl-8 pt-6 pb-8 mb-4">

                            <div className="mb-4">
                                <h3 className='text-[27px] md:text-[36px] font-bold text-[#88211A] text-center md:text-start'>Get in Touch with us</h3>
                            </div>

                            <div className="mb-4">
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>Call us at:</p>
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>+265 993363666 / +265 999839666</p>
                            </div>

                            <div className="mb-4">
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>Email us at:</p>
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>reservations@bridgeviewhotelmw.com</p>
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>bridgeviewhotel@gmail.com</p>
                            </div>

                            <div className="mb-4">
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>Contact our manager at:</p>
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>+265 885828777/+265 999664444</p>
                                <p className='md:text-[24px] font-poppins text-center md:text-start'>info@bridgeviewhotelmw.com</p>
                            </div>


                            <div className="mb-4 md:block flex flex-col justify-center items-center">
                                <div className='w-[300px] md:w-[500px]'>
                                    <MapContainer height={400}/>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Contactpage