import React, { useState, useEffect } from 'react';
import SpecialOffersCard from "../components/cards/specialofferscard";
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SpecialOfferspage = () => {
  const [offers, setOffers] = useState([]);

  const getAllSpecialOffers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "special_offers"));
      let offerMap = new Map();

      querySnapshot.forEach((offer) => {
        const offerData = {
          ...offer.data(),
          id: offer.id
        };

        if (offerMap.has(offerData.offer_type)) {
          offerMap.get(offerData.offer_type).push(offerData);
        } else {
          offerMap.set(offerData.offer_type, [offerData]);
        }
      });

      setOffers(offerMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSpecialOffers();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className='mt-[200px] mb-[40px] font-poppins text-[#88211A] font-semibold text-center text-[27px] md:text-[36px]'>Explore our Special Offers</h1>
        
        {Array.from(offers.keys()).map((offerType, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold mt-4 mb-4">{offerType.toUpperCase()}</h2>
            <div className="card md:w-[1150px] mb-5 grid md:grid-cols-2 gap-5 items-center justify-center">
              {offers.get(offerType).map((offer, cardIndex) => (
                <Link key={offer.id} to={`/details/${offerType.toLowerCase()}/${offer.entity_id}`}>
                  <SpecialOffersCard key={cardIndex} offer={offer} />
                </Link>
              ))}
            </div>
          </div>
        ))}

        
      </div>
    </>
  );
};

export default SpecialOfferspage;
