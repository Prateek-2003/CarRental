import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING',payload:true})

    try{
        const response = await axios.post("https://carrental-2-mk1u.onrender.com/users/login",reqObj)
        localStorage.setItem('user',JSON.stringify(response.data))
        message.success('Login Success')
        setTimeout(()=>{
            window.location.href='/'   
        },500)
        dispatch({type: 'LOADING',payload:false})
    }catch(error){
        console.log(error)
        message.error('Invalid credentials')
        dispatch({type: 'LOADING',payload:false})
    }
}

export const userRegister = (reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING',payload:true})

    try{
        const response = await axios.post("https://carrental-2-mk1u.onrender.com/users/register",reqObj)
        message.success('Registration Successfull')
        setTimeout(()=>{
            window.location.href='/login'   
        },500)     
        dispatch({type: 'LOADING',payload:false})
    }catch(error){
        console.log(error)
        message.error('Invalid credentials')
        dispatch({type: 'LOADING',payload:false})
    }
}