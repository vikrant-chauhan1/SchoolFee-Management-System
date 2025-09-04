import { useNavigate } from "react-router-dom";
const Navbar = ({onLogout})=>{
    const navigate = useNavigate();

    return(
        <nav 
            style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                backgroundColor:"#282c34",
                paading:"10px 20px",
                color:"white",
            }}
        
        > 
            <h3>Admin Dashboard</h3>
            <div style={{display:"felx",gap:"20px"}}>
                <button style={navButtonStyle} onClick={()=>navigate("/students")}>
                    Students
                </button>
                <button style={{navButtonStyle}} onClick={()=>navigate("/fees")}>
                    Fees
                </button>
                <button style={{navButtonStyle}} onClick={onLogout}>
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
    padding:"8px 12px",
    cursor:"pointer",
}

export default Navbar;