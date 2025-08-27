import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard =()=>{
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem("isAdmin")){
            navigate("/login")
        }
    },[navigate]); //the navigate in dependency array is just to satisfy eslint rules of not leaving the array empty 
    



    const handleLogout = ()=>{
        localStorage.removeItem("isAdmin");
        navigate("/");
    };

    return(
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Welcome, Admin 👋</h2>
            <p>This is your dashboard.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;