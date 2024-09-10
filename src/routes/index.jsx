import { Routes, Route } from "react-router-dom";
import Home from "../views/home.jsx";
import PostIndex from "../views/posts/index.jsx";
import PostCreate from "../views/posts/create.jsx";
import PostEdit from "../views/posts/edit.jsx";
import Register from "../views/auth/index.jsx";
import Login from "../views/auth/login.jsx";
import Profile from "../views/auth/Profile.jsx";

function RouteIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostIndex />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/posts/register" element={<Register />} />
      <Route path="/posts/login" element={<Login />} />
      <Route path="/posts/profile" element={<Profile />} /> {/* Route for Profile */}
    </Routes>
  );
}

export default RouteIndex;
