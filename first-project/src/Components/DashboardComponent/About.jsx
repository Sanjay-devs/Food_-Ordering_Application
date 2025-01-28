import Header from "../../Header";
import pimage from "../../Images/food2.avif";

export default function About() {
    return (
        
        <div style={{ textAlign: "center", padding: "100px" }}>
            <h1>About Us</h1>
            {/* <img
                src={pimage}
                alt="Delicious Food"
                style={{ width: "100%", maxWidth: "500px", borderRadius: "10px", margin: "20px 0" }}
            /> */}
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#555" }}>
                Welcome to our food ordering platform, your ultimate destination for satisfying
                your hunger and cravings! 🍔
            </p>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#555" }}>
                Whether you're in the mood for a hearty meal, a light snack, or a sweet treat,
                we bring the best dishes from top-rated kitchens straight to your doorstep. 🏠
            </p>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#555" }}>
                We believe in making food ordering easy, fast, and enjoyable for everyone.
                Browse through our diverse menu, select your favorites, and let us take care of
                the rest. Craving something delicious? Let’s get started! 🍽️
            </p>
        </div>
    );
}
