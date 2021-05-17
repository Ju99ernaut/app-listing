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
                    <p>
                        Status:
                        <button name={application.status.trim() || 'not available'} className="btn btn-status">
                            {application.status.trim() || 'not available'}
                        </button>
                    </p>
                    <p>{external || "none"}</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;