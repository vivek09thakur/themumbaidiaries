import PostCards from "./PostCards/PostCards";
import PropTypes from "prop-types";

const FeedFetcher = ({ feedcontent }) => {
  return (
    <>
      <div className="feed_fetcher">
        <div className="feed_fetcher_content">
          {feedcontent.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

FeedFetcher.propTypes = {
  feedcontent: PropTypes.array.isRequired,
};

export default FeedFetcher;
