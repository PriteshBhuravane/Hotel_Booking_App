import React, { useState } from "react";
import Title from "../../componenets/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  return (
    <form action="">
      <Title
        title="Add Rooms"
        font="outfit"
        align="left"
        subtitle="Peel in the details carefully and accurate room details price in and the amenities to enhance the user booking experience"
      />
      {/* upload area for image */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2  flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImages${key}`} key={key}>
            <img
              className=" max-h-12 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              id={`roomImages${key}`}
              accept="image/*"
              className="hidden"
              hidden
              onChange={(e) => {
                setImages({ ...images, [key]: e.target.files[0] });
              }}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select 
          onChange={e => setInput({ ...input, roomType: e.target.value })}
          value={input.roomType}
          className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full">
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
            <p className="text-gray-800 mt-4">Price Per Night</p>
            <input
                type="number"
                placeholder="Enter Price"
                value={input.pricePerNight}
                onChange={(e) =>
                setInput({ ...input, pricePerNight: e.target.value })
                }
                className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            />
        </div>
      </div>
        <p className="text-gray-800 mt-4"> Amenities</p>
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {Object.keys(input.amenities).map((amenity ,index) => (
                    <div key={index}>
                        <input type="checkbox" id={`amenties${index+1}`} 
                        checked={input.amenities[amenity]}
                        onChange={(e) => {
                            setInput({
                                ...input,
                                amenities: {
                                    ...input.amenities,
                                    [amenity]: !input.amenities[amenity],
                                },
                            });
                        }} />
                        <label htmlFor={`amenties${index+1}`} className="ml-2 text-gray-800">
                            {amenity}
                        </label>
                    </div>
                    
                ))}
                       
            </div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded px-6 py-2 mt-6"
                >
                    Add Room
                </button>
        </div>
    </form>
  );
};

export default AddRoom;
