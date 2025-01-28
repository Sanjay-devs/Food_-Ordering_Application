import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext"
import { toast } from "react-toastify";
import logo from "../../Images/craveconnect.jpg"
import search from "../../Images/search_icon.png"
import basket from "../../Images/basket_icon.png"
import "./Navbar.css"
import { CartContext } from "../Cart/CartContext";

export default function Navbar(){
    // const { logout } = useContext(AuthContext);
    // const {isAuthenticated} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // // Hide Navbar for Login and Register pages
    // if (location.pathname === "/Login" || location.pathname === "/Register") {
    //     return null;
    // }
    const { cartCount } = useContext(CartContext)
    const { logout, isAuthenticated } = useContext(AuthContext);
    const [menu, setMenu] = useState("menu");
    const [activeLink, setActiveLink] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedRestaurant, setselectedRestaurant] = useState("All");

    // const handleLinkClick = (link) => {
    //     setActiveLink(link);
    //     if (link === "menu") {
    //         navigate("/menu", { state: { selectedCategory } });
    //     } else if (link === "restaurants") {
    //         navigate("/restaurants", { state: { selectedRestaurant } });
    //     }
    // };
    const handleLinkClick = (link) => {
        setActiveLink(link);
    }
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token from localStorage
        logout(); // Call logout function from context
        navigate('/Login'); 
        toast.success("Logged Out Successfully");
      };

    if(!isAuthenticated || location.pathname === "/payment_gateway" || location.pathname === "/orders_list"){
        return null
    }

    return(
    <div className="navbar">
        <img src={logo} alt="Logo" className="logo-cont"/>
        
            <ul className="navbar-menu">
                {/* <li> <Link onClick={()=>handleLinkClick("home")} to="/home" className={menu==="home"?"active":""} >Home</Link></li>  */}
                <li> <Link onClick={()=>handleLinkClick("dashboard")} to="/dashboard" className={menu==="dashboard"?"active":""} >Home</Link></li> 
                <li> <Link id="menu" onClick={()=>handleLinkClick("menu")} to="/menu"  className={activeLink==="menu"?"active":""} >Menu</Link> </li>
                <li> <Link onClick={()=>handleLinkClick("restaurants")} to="/restaurants"   className={activeLink==="restaurants"?"active":""} >Restaurants</Link> </li>
                <li> <Link onClick={()=>handleLinkClick("about")} to="/about" className={activeLink==="about"?"active":""} >About Us</Link> </li>
                {/* <li> <Link onClick={()=>handleLinkClick("about")} to="/orders_list" className={activeLink==="about"?"active":""} >Orders List</Link> </li> */}
                {!isAuthenticated &&(
                            <>
                                <li><Link onClick={()=>setMenu("Login")} to="/Login" className={menu==="Login"?"active":""}>Login</Link></li> 
                                <li><Link onClick={()=>setMenu("Register")} to="/Register" className={menu==="Register"?"active":""}>Register</Link></li> 
                            </>
                        )}
            </ul>

            <div className="navbar-right">
                {/* <img src={search} alt=""></img> */}
                <div className="navbar-serach-icon">
                 <Link to="/orders">
                    <img className="basket" src={basket} alt=""></img>
                 </Link>
                 {cartCount > 0 && <div className="dot">{cartCount}</div>}   
                </div>
                <button 
                    className="nav-button"
                    onClick={handleLogout}>Log Out
                </button>
                
            </div>
        
    </div>
    );
}