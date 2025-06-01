import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

export const registerHotel = async (req, res) => {
    try {
        const {name,address, contact,city} = req.body;
        const owner = req.user._id; // Assuming the user is authenticated and their ID is available in req.user
        const hotel=await Hotel.findOne({owner});
        if (hotel) {
            return res.json({success: false, message: "You have already registered a hotel"});
        }
        await Hotel.create({name, address, contact, city, owner});
        await User.findByIdAndUpdate(owner, { role: 'hotelOwner' }, { new: true }); // Update user role to hotelOwner
        res.json({success: true, message: "Hotel registered successfully"});
    } catch (error) {
        console.error("Error registering hotel:", error);
        res.json({success: false, message: "Error registering hotel", error: error.message});
        
    }
}