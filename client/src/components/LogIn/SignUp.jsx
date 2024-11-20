import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/SignUp.css";

const SignUp = () => {
  const api = import.meta.env.VITE_API_URI;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: formData.username,
            email: formData.email,
          })
        );
        navigate(`/feed/${formData.username}`);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error during signup. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login_vector"></div>
      <div className="login-box">
        <h2>Hello Mumbaikars!</h2>
        <p>Want to share your story while keeping yourself anonymous?</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
