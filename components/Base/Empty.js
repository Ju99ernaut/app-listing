const Empty = () => {
    return (
        <div className="empty">
            <Image width="80" height="80" src="/RLY.svg" alt="coin-icon" />
            <h2>Listings Empty</h2>
            <p>There are no listings under this category check again later</p>
        </div>
    );
}

export default Empty;