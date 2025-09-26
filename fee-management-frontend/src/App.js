import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Fees from "./pages/Fees"
import {useContext } from "react";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";

const ProtectedRoute = ({children})=>{
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ? children : <Navigate to="/login" />
    
}

const App=()=>(
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route index element={<LoginWrapper />}/>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
        </Routes>
    
      </BrowserRouter>
    </AuthProvider>
  );

  const LoginWrapper = () =>{
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ? <Navigate to="/dashboard"/> : <Login />
  }


export default App;
