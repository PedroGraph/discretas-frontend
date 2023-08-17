import React, {useState, useEffect} from "react";
import "./MainPage.css";
import Navbar from '../../components/common/Navbar'
import University from '../../components/common/Universities'
import {Login} from '../Sections/Login'


const MainPage = () => {
  const [user, setUser] = useState('')

  useEffect(() =>{
    if(localStorage.getItem('user')){
      const storedName = localStorage.getItem('user');
      setUser(storedName);
    }
  })

  return (
    <>
      <Navbar user={user} setUser={setUser}/>
        <University/>
    </>
  );
};

export default MainPage;
