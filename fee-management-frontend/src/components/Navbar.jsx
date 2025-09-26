import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import { useContext } from "react";
const Navbar = ()=>{
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const handleLogout = async()=>{
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            alert("Error logging out");
            console.log(error);
        }
        

    }

    return(
        <nav 
            style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                backgroundColor:"#282c34",
                padding:"10px 20px",
                color:"white",
            }}
        
        > 
            <h3>Admin Dashboard</h3>
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px",gap:"10px"}}>
                <button style={navButtonStyle} onClick={()=>navigate("/students")}>
                    Students
                </button>
                <button style={navButtonStyle} onClick={()=>navigate("/fees")}>
                    Fees
                </button>
                <button style={navButtonStyle} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        
        
        
        </ nav>

    );

};

const navButtonStyle={
    background:"white",
    color:"#282c34",
    border:"none",
    borderRadius:"5px",
    padding:"8px 12px ",
    cursor:"pointer",
}

export default Navbar;