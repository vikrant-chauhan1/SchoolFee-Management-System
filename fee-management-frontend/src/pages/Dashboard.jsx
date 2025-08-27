import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard =()=>{
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
    },[navigate]); //the navigate in dependency array is just to satisfy eslint rules of not leaving the array empty 
    



    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    };

    const adminInfo = JSON.parse(localStorage.getItem("adminUser"));
    console.log(adminInfo);

    return(
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Welcome, {adminInfo.userName} 👋</h2>
            <p>This is your dashboard.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;