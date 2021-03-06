import fetch from '../utils/fetch';
import config from '../config';
import Stars from './Base/Stars';
import { useState } from 'react';
import Trash from './Icons/Trash';

const Reviews = ({ reviews, application, auth, authorization, user, reload }) => {
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

    const deleteReview = (id) => {
        fetch(`${config.apiEndpoint}ratings/${id}`, {
            headers: new Headers({ authorization }),
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                reload();
            })
            .catch(err => console.log("Networt error"));
    };

    const isOwner = (review) => {
        if (!auth()) return false;
        return review === user.id;
    }

    const ratingsList = reviews.map(review => {
        const date = new Date(review.updated);

        return (
            <div key={review.id} className="review">
                <span className="meta__by">{review.user.username}:</span>
                <span className="meta__by">{date.toGMTString()}</span>
                <div>{review.comment}</div>
                <Stars rating={review.rating} edit={false} />
                {auth() && isOwner(review.user.id) && <Trash onClick={() => deleteReview(review.id)} className="details-icon" />}
            </div>
        )
    });

    return (
        <div className="app-reviews">
            {ratingsList.length ? ratingsList : (<div className="review">
                <span className="meta__by">Info:</span>
                <div>This listing has no reviews yet</div>
            </div>)}
            <div style={{ display: auth() ? '' : 'none' }}>
                <p className="info">You can only add one rating per app, sending another one will overwrite the previous one</p>
                <div className="flex">
                    <input onChange={onChangeComment} value={comment} type="text" id="comment" name="comment" placeholder="comment" />
                    <div style={{ minWidth: '105px' }} >
                        <Stars onChange={onChangeStars} edit={true} rating={rating} />
                    </div>
                </div>
                <button onClick={onClick} className="btn">Leave Review</button>
            </div>
        </div>
    );
};

export default Reviews;