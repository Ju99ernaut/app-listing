import { useRef, useState, useContext } from 'react';
import LayoutContext from '../../contexts/LayoutContext';
import fetch from '../../utils/fetch';
import config from '../../config';

const UpdateListingForm = ({ app, authorization, close }) => {
    const formList = useRef(null);
    const layoutCtx = useContext(LayoutContext);
    const [msg, setMsg] = useState("Listing updated");
    const [showMsg, setShowMsg] = useState(false);

    const submitListing = e => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(formList.current));
        fetch(`${config.apiEndpoint}apps/${app.id}`, {
            headers: new Headers({ authorization }),
            method: 'PUT',
            body: JSON.stringify(Object.entries(body).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {}))
        })
            .then(res => res.json())
            .then(res => {
                if (res.detail) {
                    setMsg("Listing update failed, there may be conflicting data...");
                    setShowMsg(true);
                } else {
                    setMsg("Listing updated");
                    setShowMsg(true);
                    layoutCtx.myData();
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
            <input type="text" id="title" name="title" placeholder={app.title} />
            <input type="text" id="image" name="image" placeholder={app.image} />
            <textarea name="description" id="description" placeholder={app.description}></textarea>
            <input type="text" id="status" name="status" placeholder={app.status || "status e.g. beta"} />
            <input type="text" id="groups" name="groups" placeholder={app.groups.length ? app.groups.join(",") : "Categories comma separated e.g. bots,tools..."} />
            <input type="submit" value="Update Listing" />
        </form>
    );
};

export default UpdateListingForm;