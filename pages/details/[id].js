import dynamic from 'next/dynamic';
import config from '../../config';
import s from '../../styles/Details.module.css';
import { useContext, useEffect, useState } from 'react';
import ErrorPage from 'next/error';
import LayoutContext from '../../contexts/LayoutContext';
import browserFetch from '../../utils/fetch';

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${config.apiEndpoint}documentation/app/${params.id}`);
    const data = await res.json();

    return {
        props: { data: { appId: params.id, ...data } }
    }
}

const DynamicViewerNoSSR = dynamic(
    () => import('../../components/DynamicViewer'),
    { ssr: false }
)

const DynamicEditorNoSSR = dynamic(
    () => import('../../components/DynamicEditor'),
    { ssr: false }
)

const Detail = ({ data }) => {
    const { appId, updated, documentation, external } = data;
    const date = new Date(updated);
    const ctx = useContext(LayoutContext);
    const [currentApp, setCurrentApp] = useState(null);
    const [errorPage, setErrorPage] = useState(false);
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
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    }, []);

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
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log("Networt error"));
    }

    const updateExternal = (e) => {
        setUrl(e.target.value);
    }

    const updateMarkdown = (markdown) => {
        setMarkdown(markdown);
    }

    //<div className="meta__by">
    //     Status:
    //     <button name={application.status.trim() || 'not available'} className="btn btn-status">
    //         {application.status.trim() || 'not available'}
    //     </button>
    // </div>
    if (errorPage) return <ErrorPage statusCode={404} />

    return (
        <div className={s.details}>
            <h1 className={s.header}>Details/{currentApp?.title}</h1>
            <div className={s.container}>
                <div className={s.markdown}>
                    {!isOwner() && <DynamicViewerNoSSR value={documentation} />}
                    {isOwner() && <DynamicEditorNoSSR handleChange={updateMarkdown} value={documentation} />}
                </div>
                <div className={s.metadata}>
                    <div className="meta__by">By {currentApp?.by}</div>
                    <div className="meta__by">Update: {date.toGMTString()}</div>
                    <div style={{ paddingTop: '.5rem' }} className="filters">
                        {currentApp?.groups.map((filter, i) => <button key={i} name={filter.toLowerCase().trim()} className="btn btn-active">{filter.trim()}</button>)}
                    </div>
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
        </div>
    );
}

export default Detail;