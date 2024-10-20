import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoGetQuestionQuery } from '../service/LoginService';

const Profile = () => {
    const navigate=useNavigate();
    const {data:user}=useDemoGetQuestionQuery();
    useEffect(()=>{
        if(localStorage.getItem("Token")===""){
            navigate("/");
        }
    },[])
    console.log(user);
    
  return (
    <div className='card bg-primary '>
      profilecs
      <div>cad</div>
      <div>cad</div>
      <div>cad</div>
      <div>cad</div>
      

    </div>
  )
}

export default Profile
