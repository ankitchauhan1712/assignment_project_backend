//Import---------------------------------------------------------------------------------------------------
import express from "express";
const Routes = express.Router();
 import {saveUserData ,login} from '../controller/userController.js'
 import multer from 'multer';
//END-----------------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/'); // Specify the directory where you want to save the uploaded files
   },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for the uploaded file
   }
 });
 
 const upload = multer({ storage: storage });

//Routes Declearation-------------------------------------------------------------------------------------
Routes.post("/saveUserData", upload.single('image'), saveUserData);
Routes.post("/userLogin", login);



/**
   * EXPORT MODULE
   */
export default Routes;