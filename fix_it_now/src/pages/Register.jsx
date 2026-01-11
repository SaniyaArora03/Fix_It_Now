import { useState } from "react";
import { register } from "../services/authApi";

export default  function Register({ onSwitch }){
   const[name,setName]=useState("") ;
   const[email,setEmail]=useState("") ;
   const[password,setPassword]=useState("") ;
   const[role,setRole]=useState("CUSTOMER") ;
   const[error,setError]=useState("") ;

   const handleSubmit =async(e) =>{
    e.preventDefault();
    alert("HANDLE SUBMIT CALLED");
    try {
      await register(name, email, password, role);
      onSwitch(); 
    } catch {
      setError("Registration failed");
    }
   };
   return(
    <form  onSubmit={handleSubmit} >
        <h2>Register</h2>
    <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="CUSTOMER">Customer</option>
        <option value="TECHNICIAN">Technician</option>
      </select>

      <button type="submit">Create Account</button>

      {error && <p>{error}</p>}

      <p onClick={onSwitch} style={{ cursor: "pointer" }}>
        Already have an account? Login
      </p>    
    </form>
   ) 
}    