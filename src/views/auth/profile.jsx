import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/posts/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/posts/login");
  };

  return (
    <div className="container py-5">
      <h2>Welcome, {user ? user.name : "User"}</h2>
    </div>
  );
}
