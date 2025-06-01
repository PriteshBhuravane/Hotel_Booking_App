import User from "../models/User.js";
import { Webhook } from "svix";


const clerkWebhooks = async (req, res) => {
    try {
        const whook =new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers={
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };
        // Verify the webhook headers
        await whook.verify(JSON.stringify(req.body), headers);

        //Getting data from the webhook
        const {data,type}= req.body;

        const userData={
            _id:data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.username,
            image: data.image_url,
        }
        //switch case for different webhook types
        switch (type) {
            case "user.created":
                // Create a new user in the database
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                // Delete the user from the database
                await User.findByIdAndDelete(data.id);
                break;
            default:
                console.log("Unhandled webhook type:", type);
                break;
            
        }
        res.json({success: true, message: "Webhook processed successfully"});


    } catch (error) {
        console.error("Error processing webhook:", error);
        res.json();
    }
}

export default clerkWebhooks;