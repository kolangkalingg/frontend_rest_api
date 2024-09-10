import { Link, useLocation } from "react-router-dom";
import Routes from "./routes";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <>
      {!isLoggedIn && (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar navbar-brand mx-auto">HOME</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 gap-2" role="search">
                <li className="nav-item">
                  <Link to="/posts/register" className="nav-link active">REGISTER</Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts/login" className="nav-link active btn btn-warning text-black">LOGIN</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Routes />
    </>
  );
}
