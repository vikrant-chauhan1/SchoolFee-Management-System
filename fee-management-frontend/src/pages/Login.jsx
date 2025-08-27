import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  username:userName,password: password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        console.log("Login success");
        navigate("/dashboard");
      } else {
        alert("invalid credentials")
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Server error try again ")
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
