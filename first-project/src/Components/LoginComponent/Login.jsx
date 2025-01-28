import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { login as login_service } from "../../Service/ApiService";
import "../../Styles.css";
import { toast } from "react-toastify";
import { Link, replace, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [formData, setFormData] = useState({ emailid: "quagmaire@gmail.com", password: "123456" });
  const [errors, setErrors] = useState({});
  const { isAuthenticated,login} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const isValidEmail = (email) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]{2,}\.([A-Za-z0-9-]{2,})(?:\.([A-Za-z0-9-]{2,}))?$/.test(email);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    let validationErrors = {};
    if (!formData.emailid) validationErrors.emailid = "This field is required";
    else if (!isValidEmail(formData.emailid)) validationErrors.emailid = "Invalid email format";
  
    if (!formData.password) validationErrors.password = "This field is required";
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const payload = {
        emailid: formData.emailid, 
        password: formData.password,
      };
  
      const response = await login_service(payload);
  
      if (response.value1.statusCode === 200) {
        const token = response.value1.data; // Extract the token correctly
        localStorage.setItem("authToken", response.value1);
        localStorage.setItem("userId", response.userId);
        // isAuthenticated(true)
        login(token); // Use the login function from context
        console.log(isAuthenticated);
        toast.success("Logged in Successfully");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error(response.value1.statusMessage || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again later.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <form>
      <div className="Reg1">
        <div className="Reg">
        <h3 className="h1">Login</h3>
          <div className="ipwrap">
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="faicon"></FontAwesomeIcon>
            <input
              type="email"
              className="ip"
              name="emailid"
              value={formData.emailid}
              autoComplete="off"
              placeholder="Enter Email Address"
              onChange={handleForm}
              required
            />
          </div>
          {errors.emailid && <p className="error">{errors.emailid}</p>}

          <div className="ipwrap">
          <FontAwesomeIcon icon={faLock} className="faicon"></FontAwesomeIcon>
            <input
              type="password"
              className="ip"
              name="password"
              value={formData.password}
              autoComplete="off"
              placeholder="Enter Password"
              onChange={handleForm}
              required
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <button className="button" type="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to="/Register">Register</Link>
        </div>
      </div>
    </form>
    
  );
}
