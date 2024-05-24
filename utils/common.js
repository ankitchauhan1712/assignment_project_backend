// Import------------------------------------------------------------------------------------------
import UserModel from "../models/userModel.js";

//END----------------------------------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

/**
 * Check user exist
 * @param {*} body
 * @createdBy Ankit
 */
const checkUserExistence = async function (body) {
  try {
    const emailExist = await UserModel.findOne({
      email: body.email,
    }).lean();
    console.log("Email Exist Res :", emailExist, body);
    if (emailExist) {
      return "Email already exists.";
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};




/**
 * EXPORT MODULE
 */
export default {
  checkUserExistence,
};
