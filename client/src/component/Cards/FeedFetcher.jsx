import PropTypes from 'prop-types';
import PostCards from './PostCards/PostCards';
import "./Feed.css"

const FeedFetcher = ({ feedcontent }) => {
  if (!Array.isArray(feedcontent)) {
    return <div>Invalid content format</div>;
  }

  return (
    <div className='feed_fetcher'>
      {feedcontent.map((item) => (
        <PostCards key={item.id} post={item} />
      ))}
    </div>
  );
};

FeedFetcher.propTypes = {
  feedcontent: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeedFetcher;