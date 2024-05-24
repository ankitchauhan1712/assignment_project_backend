import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import Layout from "./layout";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer/>
        <Layout />
        {/* <h2>testing for admin.........................</h2> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
