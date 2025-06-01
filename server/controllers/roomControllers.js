import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { json } from 'express';
//API for creating a room
export const createRoom = async (req, res) => {
    try {
        const {roomType,pricePerNight,amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});
        if(!hotel) return res.json({success: false, message: "Hotel not found"});
    
    
        //upload images to cloudinary
        const uploadImages=req.files.map(async (file) => {
            const response= await cloudinary.uploader.upload(file.path);
            return response.secure_url;
    
        })
        const images=await Promise.all(uploadImages);
    
        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight:+pricePerNight,
            amenities:json.parse(amenities),
            images,// Assuming you want to store the first image as the main image
        });
        res.json({success: true, message: "Room created successfully"});
       } catch (error) {
        console.error("Error creating room:", error);
        res.json({success: false, message: "Error creating room", error: error.message});
        
       }
}

//API to get all rooms of a hotel
export const getRooms = async (req, res) => {
    try {
        const rooms=await Room.find({isAvailable:true}).populate({
            path: 'hotel',
            populate:{
                path: 'owner',
                select:'image'
            }
        }).sort({createdAt: -1});
        res.json({success: true, rooms});
    } catch (error) {
        console.error("Error fetching owner rooms:", error);
        res.json({success: false, message: "Error fetching owner rooms", error: error.message});
        
    }
}
    

//API to get a room by ID
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData=await Hotel({owner: req.auth.userId});
        const romms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: "Error fetching owner rooms", error: error.message});
    }
    
}

//API for toogle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room availability toggled successfully"});
    } catch (error) {
        console.error("Error toggling room availability:", error);
        res.json({success: false, message: "Error toggling room availability", error: error.message});
        
    } 
        
    }
    

