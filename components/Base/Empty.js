import Image from 'next/image';

const Empty = () => {
    return (
        <div className="empty">
            <Image width={150} height={150} src="/RLY.svg" alt="coin-icon" />
            <h2>Listings Empty</h2>
            <p>There are no listings under this category check again later</p>
        </div>
    );
}

export default Empty;