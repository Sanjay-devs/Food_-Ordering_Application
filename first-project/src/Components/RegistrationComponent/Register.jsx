import { useState } from "react";
import { register } from "../../Service/ApiService.jsx";
import  "../../Styles.css"
import { toast } from "react-toastify";
import "../../App.js"
import { useNavigate,Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [setTimeOut,setLoading] = useState(true);
  // const[errors, setErrors] = useState({});

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/.test(email);

  const isValidPassword = (password) =>
    /^[A-Za-z0-9]+$/.test(password);


  const handleSave = async (e) => {
    e.preventDefault();

    
    const data = {
      EmailId: email,
      Password: password,
      UserName: name,
      UserTypeId: 2,
      IsDeleted: false,
      IsActive: true,
      CreatedOn: new Date()
    };

    

  

    try {
      const response = await register(data); 
      if (response?.statusCode === 1) 
      { 
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/Login")
        }, 3000);
        
      } 
      else 
      {
        toast.error(response.StatusMessage ||"Error during registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.StatusMessage || "User with this email already exists");
    }
  };

  return (
    <form onSubmit={handleSave} className="Reg">
      <h3>Registration</h3>
      <div>
        <input className="ip"
          type="text"
          placeholder="Enter Full Name"
          required 
          onChange={(e) => setName(e.target.value) } 
          // aria-label="Full Name"
        />

        <input className="ip"
          type="email" 
          placeholder="Enter Email Address" 
          required
          onChange={(e) => setEmail(e.target.value) } 
        />

        <input className="ip"
          type="password"
          placeholder="Enter Password" 
          validatePassword
          required
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button className="button" type="submit">Register</button>
        <Link to="/Login">Already have an account?</Link>
    </div>
    </form>
    
  );
}
