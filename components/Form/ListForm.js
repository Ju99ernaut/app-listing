import { useRef, useState } from 'react';
import fetch from '../../utils/fetch';
import config from '../../config';

const ListForm = ({ authorization, close }) => {
    const formList = useRef(null);
    const [msg, setMsg] = useState("Listing submitted");
    const [showMsg, setShowMsg] = useState(false);

    const submitListing = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}apps`, {
            headers: new Headers({ authorization }),
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(new FormData(formList.current)))
        })
            .then(res => res.json())
            .then(res => {
                // Add to grid
                if (res.detail) {
                    setMsg("Listing submission failedd");
                    setShowMsg(true);
                } else {
                    setMsg("Listing submitted");
                    setShowMsg(true);
                    setTimeout(close, 1500);
                }
            })
            .catch(err => {
                setMsg("Network error");
                setShowMsg(true);
            });
        formList.current.reset();
    }

    return (
        <form ref={formList} onSubmit={submitListing}>
            {showMsg && <p className="info">{msg}</p>}
            <input type="text" id="title" name="title" placeholder="title" required />
            <input type="text" id="image" name="image" placeholder="image url" />
            <textarea name="description" id="description" placeholder="description" required></textarea>
            <input type="text" id="groups" name="groups" placeholder="Add categories comma separated" required />
            <input type="submit" value="Add Listing" />
        </form>
    );
};

export default ListForm;