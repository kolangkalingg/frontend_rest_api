import { useState, useEffect } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data posts
  const fetchDataPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      setPosts(response.data.data.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  // Delete post with confirmation
  const deletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/posts/${id}`);
        fetchDataPosts();
        Swal.fire({
          title: 'Deleted!',
          text: 'Post successfully deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        Swal.fire({
          title: 'Failed!',
          text: 'There was an error deleting the post.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  // Logout with confirmation
  const logoutHandler = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token"); // Remove token from localStorage
      Swal.fire({
        title: 'Logged out!',
        text: 'You have successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/"); // Redirect to login page
      });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between mb-3">
            <Link to="/posts/create" className="btn btn-md btn-success rounded shadow border-0">
              Add New Post
            </Link>
            <div>
              <button
                onClick={logoutHandler} // Call the logoutHandler on click
                className="btn btn-md btn-danger rounded shadow border-0 mx-2"
              >
                LogOut
              </button>
              <Link to="/posts/profile" className="btn btn-md btn-primary rounded shadow border-0">
               Profile
              </Link>
            </div>
          </div>
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-center">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col" style={{ width: "15%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts && posts.length > 0 ? (
                    posts.map((post, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img src={post.image} alt={post.title} width="200" className="rounded" />
                        </td>
                        <td className="align-middle">{post.title}</td>
                        <td className="align-middle">{post.content}</td>
                        <td className="text-center align-middle">
                          <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-info rounded-sm shadow border-0 mx-2">
                            EDIT
                          </Link>
                          <button className="btn btn-sm btn-danger rounded-sm shadow border-0 mx-2" onClick={() => deletePost(post.id)}>
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center" colSpan="4">
                        <div className="alert alert-danger mb-0">
                          No posts available
                        </div>  
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
