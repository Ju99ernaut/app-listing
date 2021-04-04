import fetch from '../utils/fetch';
import config from '../config';
import Stars from './Stars';

const Reviews = ({ reviews, application, auth, authorization, reload }) => {
    let rating = 5;
    let comment = "";
    const onChangeStars = value => rating = value;
    const onChangeComment = value => comment = value;
    const onClick = () => {
        fetch(`${config.apiEndpoint}users/me/ratings/${application}`, {
            headers: new Headers({ authorization }),
            method: 'POST',
            body: JSON.stringify({ rating, comment })
        })
            .then(res => res.json())
            .then(res => {
                reload();
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    };

    const ratingsList = reviews.map(review => {
        const date = new Date(review.updated);

        return (
            <div className="review">
                <span className="meta__by">{review.user}:</span>
                <span className="meta__by">{date.toGMTString()}</span>
                <div>{review.comment}</div>
                <Stars rating={review.rating} edit={false} />
            </div>
        )
    });

    return (
        <div className="app-reviews">
            {ratingsList}
            <div style={{ display: auth() ? '' : 'none' }}>
                <p className="info">You can only add one rating per app, sending another one will overwrite the previous one</p>
                <Stars onChange={onChangeStars} edit={true} />
                <input onChange={onChangeComment} type="text" id="comment" name="comment" placeholder="comment" />
                <button onClick={onClick} className="btn">Add Rating</button>
            </div>
        </div>
    );
};

export default Reviews;