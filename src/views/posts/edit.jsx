import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2";
import 'trix/dist/trix.css'; // Import Trix CSS
import 'trix'; // Import Trix JS

export default function PostCreate() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDetailPost = async () => {
    try {
      const response = await api.get(`/api/posts/${id}`);
      const { title, content, image } = response.data.data;
      setTitle(title);
      setContent(content);
      setImagePreview(image);
    } catch (error) {
      console.error("Error fetching post details", error);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTrixChange = (e) => {
    setContent(e.target.value);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content); // Ensure content is appended
    formData.append("_method", "PUT");

    try {
      await api.post(`/api/posts/${id}`, formData);
      Swal.fire({
        title: 'Updated!',
        text: 'Post has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/posts");
      });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="my-3">
                  <h2>POST EDIT</h2>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Gambar
                    </label>
                    {imagePreview && (
                      <div className="mb-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                          className="img-thumbnail mb-2"
                        />
                      </div>
                    )}
                    <input
                      className="form-control"
                      type="file"
                      onChange={handleFileChange}
                      id="formFile"
                    />
                    {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      placeholder="judul"
                      value={title}
                    />
                    {errors.title && <div className="alert alert-danger mt-2">{errors.title[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <input id="content" type="hidden" value={content} onChange={handleTrixChange} />
                    <trix-editor
                      input="content"
                      onChange={handleTrixChange}
                      value={content}
                    />
                    {errors.content && <div className="alert alert-danger mt-2">{errors.content[0]}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg mx-1">
                  Simpan
                </button>
                <button type="reset" className="btn btn-secondary btn-lg mx-1">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
