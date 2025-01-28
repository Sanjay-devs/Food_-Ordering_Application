import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchItems } from "../../Service/ApiService";
import "./Search.css"; // Optional: Add specific styles for the search component.

export default function Search() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            alert("Please enter a search term!");
            return;
        }

        try {
            const results = await searchItems(query);
            console.log("API Response:", results);
            navigate("/search_results", { state: results });
        } catch (error) {
            console.error("Error fetching search results:", error);
            alert("Failed to fetch results. Please try again later.");
        }
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                placeholder="Search for restaurant, food item, or more"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}
