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

                            <div className="flex justify-start space-x-2 my-2">
                                    <div className=' hover:shadow-2xl transition ease-in-out delay-200 shadow-xl text-lightBlue-600 font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2'>
                                        <a rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100089350907378&mibextid=LQQJ4d" title="Facebook" className="flex items-center p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className=" text-blue-600 w-5 h-5 fill-current">
                                                <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    {/* <div className='bg-[#d6be67] hover:shadow-2xl transition ease-in-out delay-200 shadow-xl text-lightBlue-600 font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2'>
                                        <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-blue-400 w-5 h-5 fill-current">
                                                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                                            </svg>
                                        </a>
                                    </div> */}
                                    <div className=' hover:shadow-2xl transition ease-in-out delay-200 shadow-xl text-lightBlue-600  font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2'>
                                        <a rel="noopener noreferrer" href="https://www.instagram.com/bridgeview_llw?igsh=MTVqZ2N6YWlyZ2ZtMw%3D%3D&utm_source=qr" title="Facebook" className="flex items-center p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="text-red-500 w-5 h-5 fill-current">
                                                <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                                            </svg>
                                        </a>
                                    </div>
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