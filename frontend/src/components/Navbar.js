import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Online Code Judge</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/folders">Folders</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;