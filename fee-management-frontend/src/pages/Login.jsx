import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(userName,password);
      navigate("/dashboard");
    
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login ")
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


// we use json.stringify to literally convert the oject to string in a JSON format for better readibility fi we dont use it here then two object which are useless will be sent to the server 
