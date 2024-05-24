import React, { useEffect , useState} from 'react';
import UserForm from './component/userForm';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserData from './component/userData.js/userData';



const Layout = () => {
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }, []);
  
    return (
      <div>
        <Routes>
          <Route path="/*" element={!token ? <Navigate to="/" /> : null} />
          <Route exact path="/" element={<UserForm />} /> 
          <Route exact path="/UserData" element={<UserData />} />        
          </Routes>
      </div>
    );
  };

  export default Layout;