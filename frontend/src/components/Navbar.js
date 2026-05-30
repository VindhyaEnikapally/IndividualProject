import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // triggers re-render on route changes
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isPublicRoute = 
    location.pathname === "/" || 
    location.pathname === "/login" || 
    location.pathname === "/register";

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Online Code Judge
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {!isPublicRoute && token ? (
          <>
            <Link to="/dashboard">Workspace</Link>
            <Link to="/folders">Folders</Link>
            <span onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;