import PropTypes from "prop-types";
import "./post-card.css";
import { useEffect, useState } from "react";

const PostCards = ({ post }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const generateRandomColor = (minHue, maxHue) => {
      const hue = Math.floor(Math.random() * (maxHue - minHue + 1.5)) + minHue;
      const saturation = 150;
      const lightness = 75;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    setBgColor(generateRandomColor(0, -260));
  }, []);

  return (
    <div className="post_card" style={{ backgroundColor: bgColor }}>
      <div className="post_card_title">
        <h1>{post.title}</h1>
        <p>Posted on {post.date}</p>
      </div>
      <div className="post_card_content">{post.content}</div>
    </div>
  );
};

PostCards.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCards;
