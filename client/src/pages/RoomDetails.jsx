import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../componenets/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);

  return (
    room && (
      <div className=" pt-28 md:py-35 px4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className=" text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className=" text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className=" ml-2">200+ Review</p>
        </div>

        {/* room service */}
        <div className="flex items-center gap-1 text-gray-500 mt-2 ">
          <img src={assets.locationIcon} alt="" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room iamges */}
        <div className=" flex flex-col lg:flex-row  gap-6 mt-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room image"
              className=" w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:w-1/2 gap-4 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer
          ${mainImage === image ? " outline-3 outline-orange-500" : ""}`}
                />
              ))}
          </div>
        </div>

        {/* room highlights */}
        {/* room highlights */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-10 gap-6">
          {/* Left side: Title and amenities */}
          <div className="flex flex-col md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                  key={index}
                >
                  <img
                    className="w-5 h-5"
                    src={facilityIcons[item]}
                    alt={item}
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Price */}
          <div className="md:w-1/4 text-left md:text-right">
            <p className="text-2xl font-medium whitespace-nowrap">
              ₹{room.pricePerNight.toLocaleString("en-IN")}/Night
            </p>
          </div>
        </div>
        {/* Check-in/Check-out Form — placed below */}
        <form
          className="flex flex-col md:flex-row items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-12 max-w-6xl"
          action=""
        >
          <div className="flex flex-col md:flex-row items-center gap-10 text-gray-500 w-full md:w-auto">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                required
                className="w-full md:w-40 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              />
            </div>
              <div className=" w-px h-14 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                required
                className="w-full md:w-40 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              />
            </div>
            <div className=" w-px h-14 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                placeholder="0"
                required
                className="w-full md:w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md mt-6 md:mt-0 md:ml-6 md:px-24 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availability
          </button>
        </form>

        {/* common spesifications */}
              <div className=" mt-24 space-y-4">
                {roomCommonData.map((spec, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <img
                            src={spec.icon}
                            alt={`${spec.title} icon`}
                            className="w-6.5"
                        />
                        <div>
                            <p className="text-base">{spec.title}</p>
                            <p className=" text-gray-500">{spec.description}</p>
                        </div>

                    </div>
                ))}
              </div>

              <div className=" max-w-3xl border-y border-gray-300 mt-14 py-10 text-gray-500">
                <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
              </div>

              {/* host details */}
              <div className=" flex felx-col items-start gap-4 mt-8">
                <div className="flex gap-4">
                    <img className=" w-14 h-14 md:h-16  md:w-18 rounded-full" src={room.hotel.owner.image} alt="" />
                    <div >
                        <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
                        <div className="flex items-center mt-1">
                            <StarRating/>
                            <p className=" ml-2">200+ Review</p>
                        </div>
                    </div>
                </div>
               
              </div>
              <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">contact Now</button>

      </div>
    )
  );
};

export default RoomDetails;
