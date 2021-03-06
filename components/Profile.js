import { useRef, useState } from 'react';
import fetch from '../utils/fetch';
import config from '../config';
import Stars from './Base/Stars';
import Link from 'next/link';
import Pencil from './Icons/Pencil';
import Trash from './Icons/Trash';

const Profile = ({ user, apps, ratings, authorization, reload, close, openUpdate }) => {
    const formUser = useRef(null);
    const [msg, setMsg] = useState("A confimation email has been sent.");

    const submitUpdate = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}users/me`, {
            headers: new Headers({ authorization }),
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(new FormData(formUser.current)))
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log("Networt error"));
    }

    const resend = () => {
        setMsg("Email will be sent shortly...");
        fetch(`${config.apiEndpoint}resend`, {
            headers: new Headers({ authorization })
        })
            .then(res => res.json())
            .then(res => {
                if (res.detail) setMsg("Failed to send please try again...");
                else setMsg("Email sent...");
            })
            .catch(err => console.log("Networt error"));
    }

    const deleteApp = (id) => {
        fetch(`${config.apiEndpoint}apps/${id}`, {
            headers: new Headers({ authorization }),
            method: 'DELETE'
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

    const updateApp = (app) => {
        close();
        openUpdate(app);
    }

    const appList = apps.map(app => {
        return (
            <tr key={app.id}>
                <td><Link href={`/details/${app.id}`}><a className="app-link">{app.id}</a></Link></td>
                <td>{app.title}</td>
                <td>{app.updated}</td>
                <td>{app.by}</td>
                <td>{app.groups.join(' ')}</td>
                <td><Pencil onClick={() => updateApp(app)} /> <Trash onClick={() => deleteApp(app.id)} /></td>
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
                <td><Trash onClick={() => deleteReview(review.id)} /></td>
            </tr>
        )
    });

    // <input type="text" id="email2" name="email2" value={user.email} onChange={() => { }} placeholder="email" />

    if (!user) return (
        <div>
            <p className="info">Session timed out...</p>
        </div>
    )

    return (
        <div>
            <div className="meta__by">Joined: {new Date(user.joined).toGMTString()}</div>
            {!user.active && (<div>
                <p className="info">{msg}</p>
                <button name="resend" className="btn" onClick={resend}>Resend</button>
            </div>)}
            {user.active && (<form ref={formUser} onSubmit={submitUpdate}>
                <div className="profile-info">
                    <div className="username">
                        <p className="meta__by">Username:</p>
                        <input type="text" id="username3" name="username" value={user.username} onChange={() => { }} placeholder="username" required />
                    </div>
                    <input className="submit" type="submit" value="Update" />
                </div>
            </form>)}
            <div className="profile-info">
                <div className="profile-table">
                    <p className="meta__by">Your Applications:</p>
                    <table>
                        <tr key={0}>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Updated</th>
                            <th>By</th>
                            <th>Groups</th>
                            <th>Actions</th>
                        </tr>
                        {appList}
                    </table>
                </div>
                <div className="profile-table">
                    <p className="meta__by">Your Comments:</p>
                    <table>
                        <tr key={0}>
                            <th>ID</th>
                            <th>Application</th>
                            <th>Updated</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                        {ratingsList}
                    </table>
                </div>
            </div>
            <p className="info">More actions may be available from the API at {config.apiEndpoint}docs</p>
        </div>
    );
};

export default Profile;