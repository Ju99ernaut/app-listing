import ReactStarsRating from 'react-awesome-stars-rating';

const Stars = ({ rating }) => {
    const onChange = value => console.log('stars', value);

    return <ReactStarsRating onChange={onChange} value={rating} />
};

export default Stars;