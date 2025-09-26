import {createContext,  useState, useEffect} from "react";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAdmin,setIsAdmin] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        setIsAdmin(!!token);// it is simple suppose when ther eis no token in LS then LS return null and !null will be true and one more ! will make it false 
    },[]);

    if(isAdmin===null){
        return <div>Loading...</div>

    }

    const login = async(userName,password)=>{
        
        try {
        const res = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  username:userName,password: password }),
        });

        const data = await res.json();

        console.log(data);
      
      

        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("adminUser",JSON.stringify(data.adminInfo)); 
            setIsAdmin(true)
            //we are using the stringify because local storage only stores strings and if we put object in LS it will crash 
            // thus we use stringify to serialize it and it works for token above because token is already a string P
            }
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error("Invalid Credentials or server error")
        }
  
    }

    const logout =()=>{
        try {
            localStorage.removeItem("token");
            setIsAdmin(false);
        } catch (error) {
            throw new Error("Error logging out")
        }
    }

    return(
        <AuthContext.Provider value={{isAdmin,login,logout}}>
            {children}
        </AuthContext.Provider>
    );


};

export default AuthContext;

