import Stars from './Stars';

const Reviews = () => {
    return (
        <div className="app-reviews">
            <span>user </span>
            <span>12/11/21</span>
            <div>Comment...</div>
            <Stars rating={4.5} edit={false} />
        </div>
    );
};

export default Reviews;