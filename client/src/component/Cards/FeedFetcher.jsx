import PostCards from "./PostCards/PostCards";
import PropTypes from "prop-types";
import "./Feed.css";

const FeedFetcher = ({ feedcontent }) => {
    console.log(feedcontent);
  return (
    <>
      <div className="feed_fetcher">
        {feedcontent.map((post) => (
          <PostCards key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

FeedFetcher.propTypes = {
  feedcontent: PropTypes.array.isRequired,
};

export default FeedFetcher;
