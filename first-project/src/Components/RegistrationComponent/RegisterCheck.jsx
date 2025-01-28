import { useState } from "react";
import { register } from "../../Service/ApiService.jsx";
import "../../Styles.css";
import { toast } from "react-toastify";
import { useNavigate, Link, replace } from "react-router-dom";
// import {Fav} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function RegisterCheck() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    password: "",
    verifyPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    emailid: "",
    password: "",
    verifyPassword: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change

    // Trigger live validation
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Can't be empty!";
      else if (value.length < 3) error = "Username must be at least 3 characters long";

    } else if (name === "emailid") {
      if (!value.trim()) error = "Can't be empty!";
      else if ( /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/.test(value)) error = "Invalid Email format";

    } else if (name === "password") {
      if (!value) error = "Can't be empty!";
      else if (value.length < 6) error = "Password must be at least 6 characters long";

    } else if (name === "verifyPassword") {
      if (!value) error = "Confirm your password";
      else if (value !== formData.password) error = "Passwords do not match";
    }
    return error;
  };

  const validateForm = () => {
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validationErrors[key] = validateField(key, formData[key]);
    });
    return validationErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      EmailId: formData.emailid,
      Password: formData.password,
      VerifyPassword: formData.verifyPassword,
      UserName: formData.name,
      UserTypeId: 2,
      IsDeleted: false,
      IsActive: true,
      CreatedOn: new Date(),
    };
    console.log(data);
    try {
      const response = await register(data);
      if (response?.statusCode === 200) {
        toast.success("Registration successful");
        setTimeout(() => {navigate("/Login");}, 3000);

      } else if (response?.statusCode === 403) {
        toast.error("Email already exists");

      } else {
        toast.error(response?.data?.StatusMessage || "Unexpected error during registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.StatusMessage || "Error during registration");
    }
  };

  const getClassName = (field) => {
    return errors[field]
      ? "ip error-border"
      : formData[field]
      ? "ip success-border"
      : "ip";
  };

  return (
    <form onSubmit={handleSave} className="Reg">
      <h2>Sign Up</h2>
      <div>
        <div className="ipwrap">
          <FontAwesomeIcon icon={faUser} className="faicon"></FontAwesomeIcon>
          <input
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={formData.name}
            onChange={handleForm}
            className={getClassName("name")}
            autoComplete="off"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="ipwrap">
          <FontAwesomeIcon icon={faEnvelope} className="faicon"></FontAwesomeIcon>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="emailid"
            value={formData.emailid}
            onChange={handleForm}

            className={getClassName("emailid")}
            autoComplete="off"
          />
          {errors.emailid && <span className="error">{errors.emailid}</span>}
        </div>

        <div className="ipwrap">
        <FontAwesomeIcon icon={faLock} className="faicon"></FontAwesomeIcon>  
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleForm}
            className={getClassName("password")}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        <div className="ipwrap">
          <FontAwesomeIcon icon={faLock} className="faicon"></FontAwesomeIcon> 
          <input
            type="password"
            placeholder="Confirm Password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleForm}
            className={getClassName("verifyPassword")}
          />
          {errors.verifyPassword && <span className="error">{errors.verifyPassword}</span>}
        </div>

        <button className="button" type="submit">
          Register
        </button>
        <Link to="/Login">Already have an account?</Link>
      </div>
    </form>
  );
}
