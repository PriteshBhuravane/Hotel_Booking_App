
//GET api/user/

export const getUserData= async (req, res) => {
    try {
        const role =req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities});
        
    } catch (error) {
        res.json({success: false, message: "Error fetching user data", error: error.message});
    }
}

//store user recent search cities
export const storeRecentSearchCities = async (req, res) => {
    try {
        const {recentSearchCity} = req.body;
        const user=await req.user;

        if(user.recentSearchedCities.length <3)
        {
            user.recentSearchedCities.push(recentSearchCity);
        }
        else{
            user.recentSearchedCities.shift(); // Remove the oldest city
            user.recentSearchedCities.push(recentSearchCity); // Add the new city
        }
        await user.save();
        res.json({success: true, message: "Recent search cities updated successfully"});

        
    } catch (error) {
        res.json({success: false, message: "Error updating recent search cities", error: error.message});
        
        
    }
}