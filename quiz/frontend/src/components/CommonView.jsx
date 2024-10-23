import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNrollTestMutation, useUserSignMutation, useVigneshUserSignMutation } from "../service/LoginService";

const Scorrling = () => {
    // const data = {
    //     "email": "dinesh2020csbs@gmail.com",
    //     "password": "Dinesh@2020"
    //     }
    // const [test]=useNrollTestMutation();
    // const [count,setCount]=useState(0);
    // useEffect(()=>{
    //     console.log(count);
    //     test(data);
    //     if(count!=0){
    //         setCount(count-1);
    //     }
    // },[count])

    
    // const [signup] = useUserSignMutation();
    // const [email,setEmail]=useState();
    // const [name,setName]=useState();
    // const [count,setCount]=useState(1);
    
    // useEffect(()=>{
    //     const data={
    //         "email":`test${count}@Gmail.com`,
    //         "age":"34",
    //         "designition":"software",
    //         "authority":"false",
    //         "name":`Test${count}`,
    //         "password":"1234",
    //     }
    //     // setEmail(`test${count}@Gmail.com`);
    //     // setName(`Test${count}`);
    //     if(count!=0){
    //         signup(data);
    //     }
    // },[count])
    const [signup] = useVigneshUserSignMutation();
    // const [email,setEmail]=useState();
    // const [name,setName]=useState();
    const [count,setCount]=useState(1);
    
    useEffect(()=>{
        const data={
            "address": "namakka", 
            "age": 10, 
            "gender": "Female", 
            "password": "Test@1234", 
            "email": `test${count}@gmail.com`,
            "name":`Test${count}`,
            "role":"VOTER",
            "terms":"true"
        }
        if(count!==0 && data!==null){
            signup(data);
        }
    },[count])
    return(
        <></>
    );
};

export default Scorrling;