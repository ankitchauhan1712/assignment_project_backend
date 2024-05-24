import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, Input, FormGroup } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import './userData.css';
import combinedServices from '../../services/services'
import NoDataFound from '../../assets/nodata.svg'
import ReactLoading from "react-loading";


const Paymants = (props) => {

    const [modal, setModal] = useState(false);
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");  
    const [totalCount, setTotalCount] = useState(0);   
    const [limit, setLimit] = useState(10);   
    const [loader, setLoader] = useState(true);


     useEffect(() => {
        fetchData()
    },[])
   
    const fetchData = async () => {
        try {   
             const paymentStatusResponse = await combinedServices.getUserData();   
             console.log("30===",paymentStatusResponse);    
            if (paymentStatusResponse.data.code == 200) {
                setLoader(false)
                setUserList(paymentStatusResponse.data.data);                      
                setTotalCount(paymentStatusResponse.data.data.length);         
            }

        } catch (error) {
            console.error("Error in getUserDetails request:", error);
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      };
     
    return (
        <>
           
           <div class="container-xl">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-5">
                        <h2>User <b>Management</b></h2>
                    </div>                 
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>						
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>DOB</th>
                    </tr>
                </thead>
                <tbody>
                {userList?.map((user, index) => (
                  <tr key={user.id}>
                     <td>{index + 1}</td>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.phone_number}</td>
                     <td>{formatDate(user.dob)}</td>
                </tr>
        ))}                  
                </tbody>
            </table>            
        </div>
    </div>
</div>     
     
         
         
          
        </>
    );
}

export default Paymants