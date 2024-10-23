import PropTypes from "prop-types";

const PostCards = ({ post }) => {
  return (
    <>
      <div className="post_cards">
        <div className="post_card_title">
          <h1>{post.title}</h1>
          <p>{post.date}</p>
        </div>
        <div className="post_card_content">{post.content}</div>
      </div>
    </>
  );
};

PostCards.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCards;
