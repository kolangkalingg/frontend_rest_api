import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";

export default function PostCreate() {
  // Define state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const trixRef = useRef(null);

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Store post
  const storePost = async (e) => {
    e.preventDefault();

    // Initialize form data
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", trixRef.current.editor.getDocument().toString());

    try {
      await api.post("/api/posts", formData);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil ditambah',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/posts");
      });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  // Set the content of the Trix editor if there's any existing content
  useEffect(() => {
    if (trixRef.current) {
      trixRef.current.editor.setSelectedRange([0, 0]); // Start with an empty editor
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storePost}>
                <div className="my-3">
                  <h2>TAMBAH POST BARU</h2>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Gambar
                    </label>
                    <input className="form-control" type="file" onChange={handleFileChange} id="formFile" />
                    {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Tittle
                    </label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="judul" />
                    {errors.title && <div className="alert alert-danger mt-2">{errors.title[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                      Content
                    </label>
                    <input id="trix-editor" type="hidden" name="content" />
                    <trix-editor
                      ref={trixRef}
                      className="form-control"
                      onChange={(e) => setContent(e.target.value)}
                      id="exampleFormControlTextarea1"
                    ></trix-editor>
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
