import React, { useState, useEffect } from 'react';
import './userForm.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import newLogo from "../assets/logo192.png";
import combinedServices from '../services/services'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        phone_number: "",
        dob: ""
    });

    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        phoneNumberError: "",
        dobError: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Reset errors
        setErrors({
            nameError: "",
            emailError: "",
            phoneNumberError: "",
            dobError: ""
        });

        // Simple validation (you can improve this)
        let valid = true;
        if (inputValues.name === "") {
            setErrors((prevErrors) => ({ ...prevErrors, nameError: "Please enter a valid name" }));
            valid = false;
        }
        if (inputValues.email === "") {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: "Please enter a valid email address" }));
            valid = false;
        }
        if (!/^\d{10}$/.test(inputValues.phone_number)) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneNumberError: "Please enter a valid 10-digit phone number" }));
            valid = false;
        }
        // Check if DOB is selected and user is at least 18 years old
        if (inputValues.dob === "") {
            setErrors((prevErrors) => ({ ...prevErrors, dobError: "Please select your date of birth" }));
            valid = false;
        }         
        else {
            const dobDate = new Date(inputValues.dob);
            const now = new Date();
            const ageDiff = now.getFullYear() - dobDate.getFullYear();
            const isOldEnough = ageDiff > 18 || (ageDiff === 18 && now.getMonth() > dobDate.getMonth()) || (ageDiff === 18 && now.getMonth() === dobDate.getMonth() && now.getDate() >= dobDate.getDate());
            const selectedDate = new Date(inputValues.dob);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                setErrors((prevErrors) => ({ ...prevErrors, dobError: "Please select a date in the past" }));
                valid = false;
            }
            else {
             if(!isOldEnough) {
                setErrors((prevErrors) => ({ ...prevErrors, dobError: "You must be at least 18 years old" }));
                valid = false;
            }  
        }       
        }

        if (valid) {
            // Submit form logic
            console.log("Form submitted successfully" ,inputValues);          
            // Perform any API call or further processing
            const paymentStatusResponse = await combinedServices.saveUserData(inputValues);            
            if (paymentStatusResponse.data.code ==200);
            toast("Form Submitted Successfully");
            navigate("/userData")   ;
        }
    };
    

    return (
        <div className="container-fluid adminLogin fade_wrapper">
            <div className='login_wrapper box_wrapper'>
                <div className='form_logo'>
                    <img src={newLogo} alt="logo" className="small-image" />
                </div>
                <form>
                    <div className={`form-group form_grp ${errors.nameError ? 'error' : ''}`}>
                    <label htmlFor="name" className="label-size">Name</label>
                        <input
                            type="text"
                            className={`form-control form_ctrl ${errors.nameError ? 'error' : ''}`}
                            name="name"
                            value={inputValues.name}
                            placeholder="Enter Name"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.nameError}</small>
                    </div>
                    <div className={`form-group form_grp ${errors.emailError ? 'error' : ''}`}>
                    <label htmlFor="dob">Email</label>
                        <input
                            type="email"
                            className={`form-control form_ctrl ${errors.emailError ? 'error' : ''}`}
                            name="email"
                            value={inputValues.email}
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.emailError}</small>
                    </div>
                    <div className={`form-group form_grp ${errors.phoneNumberError ? 'error' : ''}`}>
                    <label htmlFor="dob">Phone Nmber</label>
                        <input
                            type="text"
                            className={`form-control form_ctrl ${errors.phoneNumberError ? 'error' : ''}`}
                            name="phone_number"
                            value={inputValues.phone_number}
                            placeholder="Enter Phone Number"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.phoneNumberError}</small>
                    </div>
                    <div className={`form-group form_grp ${errors.dobError ? 'error' : ''}`}>
                    <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            className={`form-control form_ctrl ${errors.dobError ? 'error' : ''}`}
                            name="dob"
                            value={inputValues.dob}
                            placeholder="Enter DOB"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.dobError}</small>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary loginButtons popFBtn  wd-100">Submit</button>
                </form>
            </div>
        </div>
    );
};
export default UserForm;