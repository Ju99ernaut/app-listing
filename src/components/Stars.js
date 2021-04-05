import ReactStarsRating from 'react-awesome-stars-rating';

const Stars = ({ rating, edit, onChange }) => {
    return (
        <ReactStarsRating isEdit={edit} onChange={onChange} value={rating || 0} size={20} primaryColor="#ececec" />
    )
};

export default Stars;