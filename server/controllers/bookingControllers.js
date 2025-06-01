import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


const checkAvailability = async ({checkInDate,checkOutDate}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) }
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error("Error checking room availability:", error);
        throw new Error("Error checking room availability");
        
    }
}
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({room, checkInDate, checkOutDate});
        res.json({success: true, isAvailable});
    } catch (error) {
        console.error("Error checking room availability:", error);
        res.json({success: false, message: "Error checking room availability", error: error.message});
        
    }
}

export const createBooking = async (req, res) => {
    try {
        const{room,checkInDate,checkOutDate,guests}= req.body;
        const user=req.user._id;
        const isAvailable = await checkAvailability({room, checkInDate, checkOutDate});
        if (!isAvailable) {
            return res.json({success: false, message: "Room is not available for the selected dates"});
        }
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff=checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
        totalPrice *= nights;

        const booking = new Booking.create({
            user,
            hotel: roomData.hotel._id,
            room,
            guests:+guests,
            checkInDate,
            checkOutDate,
            totalPrice,
            
        });
        res.json({success: true, message: "Booking created successfully", booking});
    } catch (error) {
        console.error("Error creating booking:", error);
        res.json({success: false, message: "Error creating booking", error: error.message});
        
    }
}

//Api to get all bookings of a user
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({user: userId}).populate("room hotel").sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.json({success: false, message: "Error fetching user bookings", error: error.message});
        
    }
}
// Api to get all bookings of a hotel
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.user._id});
        if (!hotel) {
            return res.json({success: false, message: "Hotel not found for the user"});
        }
        const bookings = await Booking.find({hotel: hotel._id}).sort({createdAt: -1});

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}});
    } catch (error) {
        console.error("Error fetching hotel bookings:", error);
        res.json({success: false, message: "Error fetching hotel bookings", error: error.message});
        
    }
}