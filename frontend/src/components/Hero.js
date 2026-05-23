import "../styles/Hero.css";

function Hero() {
  return (
    <div className="hero">
      <h1>ONLINE CODE JUDGE</h1>

      <p>
        Practice coding, solve challenges, and improve your programming skills.
      </p>

      <div className="hero-buttons">
        <button>Start Coding</button>
        <button className="outline-btn">Explore Problems</button>
      </div>
    </div>
  );
}

export default Hero;