import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMenuItems, getFoodItemsByMenuId } from "../../Service/ApiService";
import "../Menu/Menu.css";

const Menu = ({ setSelectedCategory, onMenuClick }) => {
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await getAllMenuItems();
          setMenus(response);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      };
  
      fetchMenuItems();
    }, []);

    const handleMenuClick = (menu_id) => {
      console.log("foodmenuid",menu_id)
      navigate("/food_items", { state: { menuid_nav_menujsx: menu_id } });
    }
  
    return (
      <div className="explore-menu">
        <h1>Explore menu</h1>
        <p>You are craving😖, We are serving 👩‍🍳</p>
        <div className="explore-menu-list">
          {menus.map((menu) => (
            <div
              key={menu.menuId}
              className="explore-menu-list-item"
              // onClick={() => onMenuClick(menu)}
              onClick ={() => handleMenuClick(menu.menuId)}
            >
              <img
                src={`http://localhost:9950/UploadedFiles/${menu.menuImage}`}
                alt={menu.itemName}
              />
              <div className="menu-details">
                <p className="menu-name">{menu.itemName}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="explore-menu-hr" />
      </div>
    );
  };
  
export default Menu;
