import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

const App=()=>{
  
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(()=>{
    const adminCheck = !!localStorage.getItem("token"); // !! is used to quickly make the variable a boolean one exists = true, null= false
    if(adminCheck){
      setIsAdmin(true);
    }
  },[])
  return(
    <BrowserRouter>

      <Routes>
        <Route path="/" element={isAdmin? <Dashboard /> : <Login />}/>;
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/Login"/>}/>;
        <Route path="/login" element={<Login />} />;
      </Routes>
    
    </BrowserRouter>
  )

};
export default App;

