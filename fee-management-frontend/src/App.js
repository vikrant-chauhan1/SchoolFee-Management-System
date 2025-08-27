import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App=()=>{
  const isAdmin = localStorage.getItem("isAdmin")=== "true";

  return(
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/"/>}/>
      </Routes>
    
    </BrowserRouter>
  )

};
export default App;

