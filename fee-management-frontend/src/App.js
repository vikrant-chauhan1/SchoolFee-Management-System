import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {  useState,useEffect } from "react";

const App=()=>{
  
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(()=>{
    const adminCheck = !!localStorage.getItem("token");
    setIsAdmin(adminCheck);
  },[])
 
  return(
    <BrowserRouter>

      <Routes>
        <Route path="/" element={isAdmin? <Dashboard onLogout={()=>setIsAdmin(false)} /> : <Login onLogin={()=>setIsAdmin(true)}/>}/>
        <Route path="/dashboard" element={isAdmin ? <Dashboard onLogout={()=>setIsAdmin(false)}/> : <Navigate to="/"/>}/>
        <Route path="/login" element={isAdmin? <Navigate to="/dashboard" /> : <Login onLogin={()=>setIsAdmin(true)}/>} />
      </Routes>
    
    </BrowserRouter>
  )

};
export default App;

