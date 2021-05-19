import { useRef } from 'react';
import fetch from '../utils/fetch';
import config from '../config';
import Stars from './Stars';

const Profile = ({ user, apps, ratings, authorization }) => {
    const formUser = useRef(null);

    const submitUpdate = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}users/me`, {
            headers: new Headers({ authorization }),
            method: 'PUT',
            body: new FormData(formUser.current)
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log("Networt error"));
    }

    const appList = apps.map(app => {
        return (
            <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.title}</td>
                <td>{app.updated}</td>
                <td>{app.by}</td>
                <td>{app.groups.join(' ')}</td>
            </tr>
        )
    });

    const ratingsList = ratings.map(rating => {
        return (
            <tr key={ratings.id}>
                <td>{rating.id}</td>
                <td>{rating.application.title}</td>
                <td>{rating.updated}</td>
                <td>{rating.comment}</td>
                <td><Stars rating={rating.rating} edit={false} /></td>
            </tr>
        )
    });

    return (
        <div>
            <form ref={formUser} onSubmit={submitUpdate}>
                <input type="text" id="username3" name="username3" value={user.username} onChange={() => { }} placeholder="username" required />
                <input type="text" id="email2" name="email2" value={user.email} onChange={() => { }} placeholder="email" />
                <input type="submit" value="Update" />
            </form>
            <div className="meta__by">Joined: {new Date(user.joined).toGMTString()}</div>
            <p className="meta__by">Your Applications:</p>
            <table>
                <tr key={0}>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Updated</th>
                    <th>By</th>
                    <th>Groups</th>
                </tr>
                {appList}
            </table>
            <p className="meta__by">Your Comments:</p>
            <table>
                <tr key={0}>
                    <th>ID</th>
                    <th>Application</th>
                    <th>Updated</th>
                    <th>Comment</th>
                    <th>Rating</th>
                </tr>
                {ratingsList}
            </table>
            <p className="info">Actions are not yet implemented but you can modify data using the API at {config.apiEndpoint}docs</p>
        </div>
    );
};

export default Profile;