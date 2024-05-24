// Import------------------------------------------------------------------------------------------
import JWT from "jsonwebtoken";
import { jwtKey } from "../config/authConfig.js";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

//END----------------------------------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

/**
 * This function authenticate user in every api call
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 * @createdBy :- Ankit
 */
const authenticate = async function (req, resp, next) {
  try {
    let token = req.headers.authorization;
    console.log("request token", req.headers.authorization);
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }

    /**Get JWT token */
    JWT.verify(token, jwtKey.user_secret, async function (err, decoded) {
      if (err) {
        return resp
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      if (decoded) {
        console.log("decoded response  ", decoded);
        const userHasValid = await UserModel.findOne({ _id: decoded.id });
        console.log("user data in auth", userHasValid);
        if (!userHasValid)
          return resp
            .status(401)
            .send({ auth: false, message: "Invalid User." });
        req["userId"] = decoded.id;
        next();
      }
    });
  } catch (error) {
    return resp.status(401).send({ message: "Failed to authenticate token." });
  }
};

/**
 * Comparing Password
 * @param {*} first
 * @param {*} second
 * @createdBy :- Ankit
 */
const comparePassword = async function (first, second) {
  return await bcrypt.compare(first, second);
};

/**
 * Get Encryt Password
 * @param {*} password
 * @param {*} rounds
 * @createdBy :- Ankit
 */
const getHashedPassword = async function (password, rounds) {
  return await bcrypt.hash(password, await bcrypt.genSalt(rounds));
};

/**
 * This function generate JWT authentication token for MBTS users
 * @param {*} clientId
 * @param {*} validity
 * @createdBy :- Ankit
 */
const getUserJWTToken = function (user_id, validity) {
  try {
    console.log("Token Request Body : ", user_id, validity, jwtKey.user_secret);
    /********************Generate JWT authentication token******************************/
    let token = JWT.sign({ id: user_id }, jwtKey.user_secret, {
      expiresIn: "30 days",
    });
    console.log("token :", token);
    return token;
  } catch (error) {
    console.log("user jwt error", error);
  }
};


/**
 * This function generate JWT authentication token for MBTS users verify email
 * @param {*} clientId
 * @param {*} validity
 * @createdBy :- Ankit
 */
const getVerifyEmailJWTToken = function (user_id, validity) {
  try {
    console.log(
      "Token Request Body : ",
      user_id,
      validity,
      jwtKey.verify_email_secret
    );
    /********************Generate JWT authentication token******************************/
    let token = JWT.sign({ id: user_id }, jwtKey.verify_email_secret, {
      expiresIn: validity,
    });
    console.log("token :", token);
    return token;
  } catch (error) {
    console.log("user jwt error", error);
  }
};

/**
 * @param {*} clientId
 * @param {*} validity
 * @createdBy :- Ankit
 */
const getAdminJWTToken = function (clientId, validity) {
  try {
    /********************Generate JWT authentication token for admin******************************/
    console.log("126======", clientId);
    let token = JWT.sign({ id: clientId }, jwtKey.admin_secret, {
      expiresIn: validity,
    });
    return token;
  } catch (error) {
    console.log("admin jwt error", error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 * @createdBy :- Ankit
 */
const adminAuthenticate = async function (req, resp, next) {
  try {
    console.log("res body token:", req.headers.authorization);
    let token = req.headers.authorization;
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }

    JWT.verify(token, jwtKey.admin_secret, async function (err, decoded) {
      if (err) {
        return resp
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      if (decoded) {
        console.log("decode :", decoded);
        const userHasValid = await UserModel.findOne({ _id: decoded.id });
        console.log("164====");
        if (!userHasValid)
          return resp
            .status(401)
            .send({ auth: false, message: "Invalid User." });
        req["userId"] = decoded.id;
        next();
      }
    });
  } catch (error) {
    return resp.status(401).send({ message: "Failed to authenticate token." });
  }
};



/**
 * EXPORT MODULE
 */

export default {
  authenticate,
  comparePassword,
  getHashedPassword,
  getUserJWTToken,
  getAdminJWTToken,
  getVerifyEmailJWTToken,
  adminAuthenticate 
};
