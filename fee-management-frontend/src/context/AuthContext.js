import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAdmin,setIsAdmin] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        setIsAdmin(!!token);// it is simple suppose when ther eis no token in LS then LS return null and !null will be true and one more ! will make it false 
    },[]);

}