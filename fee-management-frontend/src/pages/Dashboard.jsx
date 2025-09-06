import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// simple dashboard layout planning
// gonna show a simple navbar above with three options including students,fees and logout
// hero section will just be a welcome screen for the admin and a TODO in the end that will simply use local storage

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
        <div>

            <Navbar onLogout={handleLogout} />  
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h2>Welcome, {adminInfo.userName} 👋</h2>
                <p>This is your dashboard.</p>
                <p style={{marginTop:"50px",fontStyle:"italic"}}>
                    TODO: Show tasks here from localstorage
                </p>

            </div> 
        </div>    
    );
}

export default Dashboard;