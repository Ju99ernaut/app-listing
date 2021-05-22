import { useRef } from 'react';
import Reviews from './Reviews';
import Link from 'next/link';

const AppDetail = ({ reviews, app, auth, authorization, reload }) => {
    const details = useRef(null);
    const revs = useRef(null);
    const buttons = useRef(null);
    const { image, by, updated, groups, description } = app;
    const filterList = groups.map((filter, i) => <button key={i} name={filter.toLowerCase().trim()} className="btn btn-active">{filter.trim()}</button>);
    const date = new Date(updated);

    const switchTab = (e, tab) => {
        if (tab === 'reviews') {
            details.current.style.display = 'none';
            revs.current.style.display = '';
        } else {
            details.current.style.display = '';
            revs.current.style.display = 'none';
        }
        _activateButton(e);
    }

    const _activateButton = e => {
        const btns = buttons.current.querySelectorAll('button');
        btns.forEach(btn => btn.classList.remove('btn-active'));
        e.currentTarget.classList.add('btn-active');
    }

    return (
        <div className="app-expanded">
            <div className="app-image">
                <img src={image} alt="app" />
            </div>
            <div ref={buttons} className="filters">
                <button onClick={switchTab} name="details" className="btn btn-tab btn-active">Details</button>
                <button onClick={e => switchTab(e, 'reviews')} name="reviews" className="btn btn-tab">Reviews</button>
            </div>
            <div ref={details} className="app-details">
                <div className="meta__by">By {by}</div>
                <div className="meta__by">Update: {date.toGMTString()}</div>
                <div style={{ paddingTop: '.5rem' }} className="filters">
                    {filterList}
                </div>
                <div className="meta__by">Status:
                    <button name={app.status.trim() || 'not available'} className="btn btn-status">{app.status.trim() || 'not available'}</button>
                </div>
                <p>{description}</p>
                <Link href={`/details/${app.id}`}>
                    <button name="more-details" className="btn">More Details</button>
                </Link>
            </div>
            <div style={{ display: 'none' }} ref={revs}>
                <Reviews auth={auth} authorization={authorization} application={app.id} reviews={reviews} reload={reload} />
            </div>
        </div>
    );
};

export default AppDetail;