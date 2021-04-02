import { useRef } from 'react';
import fetch from '../utils/fetch';
import config from '../config';

const ListForm = ({ authorization }) => {
    const formList = useRef(null);

    const submitListing = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}users/me/apps`, {
            authorization,
            method: 'POST',
            body: new FormData(formList.current)
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log("Networt error"));
        formList.current.reset();
    }

    return (
        <form ref={formList} onSubmit={submitListing}>
            <input type="text" id="title" name="title" placeholder="title" required />
            <input type="text" id="image" name="image" placeholder="image url" required />
            <textarea name="description" id="description" placeholder="description" required></textarea>
            <input type="text" id="groups" name="groups" placeholder="Add categories comma separated" required />
            <input type="submit" value="Add Listing" />
        </form>
    );
};

export default ListForm;