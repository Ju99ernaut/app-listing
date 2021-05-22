import fetch from '../utils/fetch';
import config from '../config';
import Stars from './Stars';
import { useState } from 'react';

const Reviews = ({ reviews, application, auth, authorization, reload }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const onChangeStars = value => setRating(value);
    const onChangeComment = e => setComment(e.target.value);
    const onClick = () => {
        fetch(`${config.apiEndpoint}ratings/${application}`, {
            headers: new Headers({ authorization }),
            method: 'POST',
            body: JSON.stringify({ rating, comment })
        })
            .then(res => res.json())
            .then(res => {
                reload();
            })
            .catch(err => console.log("Networt error"));
    };

    const ratingsList = reviews.map(review => {
        const date = new Date(review.updated);

        return (
            <div key={review.id} className="review">
                <span className="meta__by">{review.user.username}:</span>
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
                <div className="flex">
                    <input onChange={onChangeComment} value={comment} type="text" id="comment" name="comment" placeholder="comment" />
                    <div style={{ minWidth: '105px' }} >
                        <Stars onChange={onChangeStars} edit={true} rating={rating} />
                    </div>
                </div>
                <button onClick={onClick} className="btn">Add Rating</button>
            </div>
        </div>
    );
};

export default Reviews;