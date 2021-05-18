import dynamic from 'next/dynamic';
import config from '../../config';
import s from '../../styles/Details.module.css';

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${config.apiEndpoint}documentation/app/${params.id}`);
    const data = await res.json();;

    return {
        props: { data }
    }
}

const DynamicViewerNoSSR = dynamic(
    () => import('../../components/DynamicViewer'),
    { ssr: false }
)

const Detail = ({ data }) => {
    const { application, updated, documentation, external } = data;
    const filterList = application.groups.map((filter, i) => <button key={i} name={filter.toLowerCase().trim()} className="btn btn-active">{filter.trim()}</button>);
    const date = new Date(updated);


    return (
        <div className={s.details}>
            <h1 className={s.header}>Details/{application.title}</h1>
            <div className={s.container}>
                <div className={s.markdown}>
                    <DynamicViewerNoSSR value={documentation} />
                </div>
                <div className={s.metadata}>
                    <div className="meta__by">By {application.by}</div>
                    <div className="meta__by">Update: {date.toGMTString()}</div>
                    <div style={{ paddingTop: '.5rem' }} className="filters">
                        {filterList}
                    </div>
                    <div className="meta__by">
                        Status:
                        <button name={application.status.trim() || 'not available'} className="btn btn-status">
                            {application.status.trim() || 'not available'}
                        </button>
                    </div>
                    <a href={external || "/"} target="_blank" rel="noopener noreferrer" class={s.link}>
                        {external || "no external link"}
                        <span>
                            <svg aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
                                <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
                                <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
                            </svg>
                            <span class={s.sr}>(opens new window)</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Detail;