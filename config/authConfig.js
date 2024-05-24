//Import---------------------------------------------------------------------------------
import * as dotenv from "dotenv";
//END-----------------------------------------------------------------------------------


dotenv.config();

export const jwtKey = {
    user_secret: process.env.USER_SECRET,
    admin_secret:process.env.ADMIN_SECRET,   
 
}

