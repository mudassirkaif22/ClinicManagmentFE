import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const [data, setData] = useState([]);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() == "" && password.trim() == "") {
      toast.error("Please enter valid credentials!");
    }

    try {
      const response = await axios
        .get("https://localhost:7118/api/Signup")
        .then((result) => {
          //console.log(result.data);

          setData(result.data);

          // console.log(data);

          data.map((item) => {
            // console.log(item.email);

            if (item.email == email && item.password == password) {
              navigate("/patient", {
                state: {
                  id: item.id,
                  name: item.name,
                },
              });
            }
            else{
              setError('Invalid Credentials');
            }
          });
        });


    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Email or Password is Wrong");
      }
    }
  };
  return (
    <div className="img">
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="transparent  p-3 rounded w-25">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>
                <strong>Email</strong>:
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Password</strong>:
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-3">
              Login
            </button>
          </form>
          {error && <p className="error">{error}</p>}

          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light mb-3"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
