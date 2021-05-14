import dynamic from 'next/dynamic';
import config from '../../config';

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${config.apiEndpoint}documentation/app/${params.id}`);
    const data = await res.json();;

    return {
        props: { data }
    }
}

const DynamicEditorNoSSR = dynamic(
    () => import('../../components/DynamicEditor'),
    { ssr: false }
)

const Detail = ({ data }) => {
    return (
        <div>
            <h1>Details</h1>
            <DynamicEditorNoSSR />
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default Detail;