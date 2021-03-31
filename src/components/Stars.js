import ReactStarsRating from 'react-awesome-stars-rating';

const Stars = ({ rating, edit }) => {
    const onChange = value => console.log('stars', value);

    return <ReactStarsRating isEdit={edit} onChange={onChange} value={rating} size={20} primaryColor="#ececec" />
};

export default Stars;