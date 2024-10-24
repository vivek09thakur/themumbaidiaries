import PropTypes from "prop-types";
import "./post-card.css";
import { useEffect, useState } from "react";

const PostCards = ({ post }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const generateRandomColor = (minHue, maxHue) => {
      const hue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;
      const saturation = 25;
      const lightness = 65;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    setBgColor(generateRandomColor(0, -360));
  }, []);

  return (
    <div className="post_card" style={{ backgroundColor: bgColor }}>
      <div className="post_card_title">
        <h1>{post.title}</h1>
        <p>Posted on {post.date}</p>
      </div>
      <div className="post_card_content">
        {post.content}
        <br />
        <br />
        {post.tags.map((tag, index) => (
          <span key={index} className="post_card_tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

PostCards.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCards;
