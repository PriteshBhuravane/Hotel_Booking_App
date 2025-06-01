import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotel:{type:String,ref:"Hotel", required: true}, // Hotel ID
    roomType:{ type: String, required: true }, // e.g., Single, Double, Suite
    pricePerNight: { type: Number, required: true }, // Price per night
    amenities: { type:Array, required: true }, // e.g., WiFi, TV, AC
    images: { type: String}, // Image URL
    isAvailable: { type: Boolean, default: true }, // Availability status   


},{ timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;