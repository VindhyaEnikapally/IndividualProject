import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>ONLINE CODE JUDGE</h1>

      <p>
        Practice coding, solve challenges, and improve your programming skills.
      </p>

      <div className="hero-buttons">
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default Hero;