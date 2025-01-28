import { createContext, useState, useEffect } from "react";
import { getTotalCartItems } from "../../Service/ApiService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0); // Shared cart count state

    // Fetch total cart items on component mount or whenever the user logs in
    useEffect(() => {
        const fetchCartCount = async () => {
            const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
            if (userId) {
                try {
                    const totalItems = await getTotalCartItems(userId);
                    setCartCount(totalItems);
                } catch (error) {
                    console.error("Failed to fetch cart items:", error);
                }
            }
        };

        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
