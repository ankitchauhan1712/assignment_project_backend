//Import---------------------------------------------------------------------------------------------
import mongoose from 'mongoose'
import UserModel from "../models/userModel.js";
import SendEmail from '../utils/nodemailer.js'
import CommonUtil from '../utils/common.js'
import bcrypt from "bcrypt";
import AuthenticationUtil from '../utils/auhtenication.js'
//END------------------------------------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

/**
 * save user data
 * @param body
 * @createdBy Ankit
 */

const saveUserData = async function (body , file) {
  try {
    // const { body, file } = req;
    console.log("saveUserData request body :", body ,file.filename);
    
    body.image = file.filename

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({ error: true, message: 'No file uploaded' });
    }
    
   /**Check if user already exist */
   const userExist = await CommonUtil.checkUserExistence(body);
   if (userExist) {
     throw userExist;
   }
   /**Password hashing */
   body.password = bcrypt.hashSync(body.password, 10);

    const userDetails = await new UserModel(body).save();
     
    if(!userDetails){
        return {error:true , message:"Internal Server Error"}
    }   

    // send email   
    let subject = "Email"
    let name = userDetails.name  
    let email = userDetails.email
    let resMail = await SendEmail.sendEmail(email , subject , name); 

    return userDetails;
  } catch (err) {
    console.log("register", err);
    return { error: true, message: err };
  }
};

const login = async function (email, password, category) {
  try {
    console.log("Email , Password", email, password, category);

    if (
      !email ||
      !password ||
      // !category ||
      email == "" ||
      password == ""
      // category == ""
    ) {
      throw "Missing email or password.";
    }
    /**Getting Role  */

    let user = await userLogin(email, password, category);
    console.log("373=====", user);

    if (user["error"] == true) {
      return user;
    }
    let token;

   

   
      /**Getting User Jwt Token  */
      token = await AuthenticationUtil.getUserJWTToken(user["_id"], "30d");
    

    user["password"] = "";

    const data = {
      token: token,
      user: user,
    };

    return data;
  } catch (err) {
    console.log("userLogin", err);
    return { error: true, message: err };
  }
};

const userLogin = async function (email, password, category) {
  try {
    console.log(
      "Resquest Body login :",
      email,
      password,
      category
    ); 
  
    /** find user with role id and email */
    let user = await UserModel.findOne({
      email: email,
    }).lean();

    // role_id:dbRes._id
    if (!user) {
      return { error: true, message: "user doesn't exists." };
    }
  
    let role_type = category;
 
    /**Match user password */
    const isValid = await AuthenticationUtil.comparePassword(
      password,
      user.password
    );
    if (!isValid) return { error: true, message: "Invalid Credentials! " };


    return user;
  } catch (err) {
    console.log("login", err);
    return { error: true, message: err };
  }
};

  /**
 * Admin Login
 * @param {*} email
 * @param {*} password
 * @createdBy Ankit
 */
const adminLogin = async function (email, password ) {
  try {
    console.log("admin body :", email, password);
    if (
      !email ||
      !password ||
      email == "" ||
      password == ""
    ) {
      return { error: true, message: "Missing email or password." };
    }
    const userType = "ADMIN";

    let res = await login(email, password, userType);
    if (res["error"] == true) {
      return res;
    }
    /**Getting User Jwt Token  */
    let token = await AuthenticationUtil.getAdminJWTToken(res["_id"], "30d");

    delete res["_id"];
    res["password"] = "";

    const data = {
      token: token,
      user: res,
    };
    return data;
  } catch (err) {
    console.log("adminLogin", err);
    return { error: true, message: err };
  }
};

/**
 * EXPORT MODULE
 */

export default {
saveUserData,
login
};
