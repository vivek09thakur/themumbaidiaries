import Profile from "./User/Profile/Profile";
import { useState, useEffect } from "react";
import "./Feed.css";
const Feed = () => {
  const api = import.meta.env.VITE_API_URI;
  const baseURL = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000';

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${api}/get_all_posts/`); // Fix the endpoint
        const data = await response.json();
        if (data.status === "success") {
          setPosts(data.data); // Fix the data access
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [api]);

  const getRandomBgColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 75%)`;
  };

  return (
    <>
      <Profile />
      <div>
        <h1>Feed</h1>
        {posts.map((post) => (
          <div className="post_grid" key={post.postId}>
            <div className="posts" style={{background: getRandomBgColor()}}>
              <h1 style={{fontSize:'30px'}}>{post.caption}</h1>
              <img src={`${baseURL}${post.image}`} alt={post.caption} />
              <p>{post.content}</p>
              <p style={{}}>Posted by : Anonymous User</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
