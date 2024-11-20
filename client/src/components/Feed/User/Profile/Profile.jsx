import { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Styles/userStyles.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const sessionToken = localStorage.getItem("sessionToken");
  const [userData, setUserData] = useState({
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URI;

useEffect(() => {
  const fetchUserProfile = async () => {
      if (!user?.username || !sessionToken) {
          setError("No username or session token provided");
          setLoading(false);
          return;
      }

      try {
          const response = await fetch(`${api}/get_user_profile/${user.username}/${sessionToken}/`);
          const data = await response.json();

          if (data.status === "success") {
              setUserData(data.data);
          } else {
              setError(data.message);
          }
      } catch (err) {
          setError("Failed to fetch user profile");
          console.error("Failed to fetch user profile:", err);
      } finally {
          setLoading(false);
      }
  };

  fetchUserProfile();
}, [api, user?.username, sessionToken]);

  if (!sessionToken) return <div>Please login to view profile</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>User not found</div>;

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      <div className="profile-header profile-popover">
        <div
          className="profile-icon"
          onClick={() =>
            (document.getElementById("profilePopup").style.display = "block")
          }
        >
          <AiOutlineUser size={34} className="profile-icon" />
        </div>
        <div
          id="profilePopup"
          className="profile-popup"
          style={{ display: "none" }}
        >
          <div className="profile-content">
            <span
              className="close-btn"
              onClick={() =>
                (document.getElementById("profilePopup").style.display = "none")
              }
            >
              <AiOutlineClose size={24} />
            </span>
            <h1>{userData.username}{"`"}s Profile</h1>
            <div className="profile-details">
              <p>
                {userData.email}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(userData.date_joined).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Login:</strong>{" "}
                {new Date(userData.last_login).toLocaleDateString()}
              </p>
              <Link to={`/feed/create_post/${user.username}/${sessionToken}/`}>Create Post</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;