import { Link } from "react-router-dom"
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function SessionExpire(){
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        logout();
     navigate("/Login"); // Correct usage of navigate
    }, 3000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [navigate]);

  return (
    <div>
      <h3>Your session has expired. Please log in again to continue.</h3>
    </div>
  );
}