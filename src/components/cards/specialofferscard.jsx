import React from 'react';
import c1 from "../../assets/specialofferspage/1.png";

const SpecialOfferCouponCard = ({ offer }) => {
  return (
    <div className='md:w-[550px] w-[290px] md:h-[320px] h-[361px] bg-white border rounded-md overflow-hidden shadow-md'>
      <img src={c1} alt='' className='w-full h-32 object-cover' />
      <div className='p-4'>
        <p className='text-xl font-medium mb-2'>{offer.offer_type}</p>
        <p className='text-lg mb-2 italic'>{offer.restaurant || offer.wedding_venue || offer.conference_venue || offer.room_type}</p>
        <p className='text-sm font-semibold mb-4'>{`Valid from ${offer.validity_dates.from} to ${offer.validity_dates.to}`}</p>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex flex-col md:flex-row justify-center items-center gap-[7px] md:gap-[11px]'>
            <p className='text-lg font-semibold'>{offer.price_per_event?offer.price_per_event+" MK":""}</p>
            <div
              style={{
                backgroundColor: "#ff0000",
                padding: '0.5rem',
                borderRadius: '0.25rem',
                color: '#fff',
                fontWeight: 'bold',
                display: 'inline-block',
              }}
            >
              {`${offer.discount_percentage}% OFF`}
            </div>
          </div>
          <button className='w-[108px] h-[43px] bg-[#88211A] text-white font-semibold rounded-md'>
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferCouponCard;
