import dynamic from 'next/dynamic';
import config from '../../config';
import s from '../../styles/Details.module.css';
import { useContext, useEffect, useState } from 'react';
import ErrorPage from 'next/error';
import LayoutContext from '../../contexts/LayoutContext';
import browserFetch from '../../utils/fetch';
import Reviews from '../../components/Reviews';
import Stars from '../../components/Base/Stars';

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${config.apiEndpoint}documentation/app/${params.id}`);
    const data = await res.json();

    return {
        props: { data: { appId: params.id, ...data } }
    }
}

const DynamicViewerNoSSR = dynamic(
    () => import('../../components/Markdown/DynamicViewer'),
    { ssr: false }
)

const DynamicEditorNoSSR = dynamic(
    () => import('../../components/Markdown/DynamicEditor'),
    { ssr: false }
)

const Detail = ({ data }) => {
    const { appId, updated, documentation, external } = data;
    const date = new Date(updated);
    const ctx = useContext(LayoutContext);
    const [currentApp, setCurrentApp] = useState(null);
    const [errorPage, setErrorPage] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(0);
    const [url, setUrl] = useState(external || "");
    const [markdown, setMarkdown] = useState(documentation || "Hello world");

    useEffect(() => {
        browserFetch(`${config.apiEndpoint}apps/${appId}`)
            .then(res => res.json())
            .then(res => {
                if (res.detail) setErrorPage(true);
                else {
                    setErrorPage(false);
                    setCurrentApp(res);
                }
            })
            .catch(err => console.log("Networt error"));

        browserFetch(`${config.apiEndpoint}ratings/average/${appId}`)
            .then(res => res.json())
            .then(res => {
                setRating(res.rating);
            })
            .catch(err => console.log("Networt error"));

        browserFetch(`${config.apiEndpoint}meta/ratings/${appId}`)
            .then(res => res.json())
            .then(res => {
                setCount(res.count);
            })
            .catch(err => console.log("Networt error"));

        loadReviews();
    }, []);

    const loadReviews = () => {
        browserFetch(`${config.apiEndpoint}ratings/app/${appId}`)
            .then(res => res.json())
            .then(res => {
                setReviews(res);
            })
            .catch(err => console.log("Networt error"));
    }

    const isOwner = () => {
        if (!currentApp || !ctx.authenticated()) return false;
        return currentApp.owner.id === ctx.user.id;
    }

    const updateDocs = () => {
        browserFetch(`${config.apiEndpoint}documentation/${appId}`,
            {
                headers: new Headers({ authorization: ctx.token }),
                method: 'POST',
                body: JSON.stringify({
                    documentation: markdown,
                    external: url
                })
            })
            .catch(err => console.log("Networt error"));
    }

    const updateExternal = (e) => {
        setUrl(e.target.value);
    }

    const updateMarkdown = (markdown) => {
        setMarkdown(markdown);
    }

    if (errorPage) return <ErrorPage statusCode={404} />

    return (
        <div className={s.details}>
            <h1 className={s.header}>
                {currentApp?.title}&nbsp;
                {currentApp?.status && <button name={currentApp?.status.trim()} className="btn btn-status">{currentApp?.status.trim()}</button>}
            </h1>
            <div className={s.container}>
                <div className={s.markdown}>
                    {!isOwner() && <DynamicViewerNoSSR value={documentation} />}
                    {isOwner() && <DynamicEditorNoSSR handleChange={updateMarkdown} value={documentation} />}
                </div>
                <div className={s.metadata}>
                    <div className="app-image">
                        <img src={currentApp?.image.startsWith('http') ? currentApp?.image : "/" + currentApp?.image} alt="app" />
                    </div>
                    <div className="meta__by">By {currentApp?.by}</div>
                    <div className="meta__by">Updated: {date.toGMTString()}</div>
                    <div style={{ paddingTop: '.5rem' }} className="filters">
                        {currentApp?.groups.map((filter, i) => <button key={i} name={filter.toLowerCase().trim()} className="btn btn-category">{filter.trim()}</button>)}
                    </div>
                    <div className="meta__by">Description:</div>
                    <p>{currentApp?.description}</p>
                    {!isOwner() && (<a href={external || "/"} target="_blank" rel="noopener noreferrer" className={s.link}>
                        {external || "no external link"}
                        <span>
                            <svg aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" className="icon outbound">
                                <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
                                <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
                            </svg>
                            <span className={s.sr}>(opens new window)</span>
                        </span>
                    </a>)}
                    {isOwner() && (<div className={s.mt}>
                        <input type="text" id="external" name="external" value={url} onChange={updateExternal} placeholder="https://example.com" />
                        <button onClick={updateDocs} name="save" className="btn">Save</button>
                    </div>)}
                </div>
            </div>
            <h2 className={s.header}>Reviews</h2>
            <div className={s.container}>
                <div className={s.reviewsContainer}>
                    <Reviews auth={ctx.authenticated} authorization={ctx.token} application={appId} reviews={reviews} user={ctx.user} reload={loadReviews} />
                </div>
                <div className={s.ratingSummary}>
                    <div className="meta__by">Average Rating</div>
                    <h2>{typeof rating === 'number' ? rating : 0}</h2>
                    <Stars rating={typeof rating === 'number' ? rating : 0} edit={false} />
                    <div className="meta__by">Number Of Reviews</div>
                    <p>{count}</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;