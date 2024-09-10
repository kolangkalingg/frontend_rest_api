import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/posts");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await api.post("/api/login", formData);
      localStorage.setItem("token", response.data.access_token);
      navigate("/posts");
    } catch (error) {
      setValidation(error.response.data);
    }
  };

    return (
        <>
            <style>
                {`
          .gradient-custom-3 {
            /* fallback for old browsers */
            background: #84fab0;

            /* Chrome 10-25, Safari 5.1-6 */
            background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
          }

          .gradient-custom-4 {
            /* fallback for old browsers */
            background: #84fab0;

            /* Chrome 10-25, Safari 5.1-6 */
            background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
          }
        `}
            </style>

            <section
                className="vh-100 bg-image"
                style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}
            >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-5">
                                        {
                                            validation.message && (
                                                <div className="alert alert-danger" role="alert">
                                                    {validation.message}
                                                </div>
                                            )
                                        }
                                        <h2 className="text-uppercase text-center mb-5">Login</h2>

                                        <form onSubmit={loginHandler}>
                                            <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginEmail">Your Email</label>
                                                <input type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Alamat email"
                                                    autoFocus />
                                                {
                                                    validation.email && (
                                                        <small className="text-danger">
                                                            {validation.email[0]}
                                                        </small>
                                                    )
                                                }
                                               
                                            </div>

                                            <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginPassword">Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Kata Sandi" />
                                                {
                                                    validation.password && (
                                                        <small className="text-danger">
                                                            {validation.password[0]}
                                                        </small>
                                                    )
                                                }
                                               
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-primary me-2" type="submit">Login</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">
                                                Don't have an account? <a href="#!" className="fw-bold text-body"><u>Register here</u></a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
