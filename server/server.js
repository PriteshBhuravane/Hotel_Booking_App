import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

//midelware
app.use(express.json());
app.use(clerkMiddleware());


//API liste to clerk webhooks
app.use('/api/clerk',clerkWebhooks);
app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter); 
app.use('/api/booking',bookingRouter)// Assuming rooms are part of hotel routes


app.get('/', (req, res) => {res.send('API is fine');});
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});
export default app;