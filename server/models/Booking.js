import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
   user:{type: String, ref: "User", required: true}, // User ID
    hotel: { type: String, ref: "Hotel", required: true }, // Hotel ID
    room: { type: String, ref: "Room", required: true }, // Room ID
    checkInDate: { type: Date, required: true }, // Check-in date
    checkOutDate: { type: Date, required: true }, // Check-out date
    totalPrice: { type: Number, required: true }, // Total price for the booking
    guests: { type: Number, required: true }, // Number of guests
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }, // Booking status
    paymentStatus: { 
        type: String ,
        required: true,
        default:"Pay At Hotel"
    },
    isPaid:{type:Boolean,default:false} // Payment status
    


},{ timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;