const AppDetail = ({ reviews, app }) => {
    const { image, by, updated, groups, description } = app;
    const filterList = groups.split(',').map(filter => <button name={filter.toLowerCase().trim()} className="btn">{filter.trim()}</button>);
    const date = new Date(updated);

    return (
        <div className="app-expanded">
            <div className="app-image">
                <img src={image} alt="app" />
            </div>
            <div className="app-details">
                <div className="meta__by">By {by}</div>
                <div className="meta__by">Update: {date.toGMTString()}</div>
                <div style={{ paddingTop: '.5rem' }} className="filters">
                    {filterList}
                </div>
                <p>{description}</p>
                <button name="reviews" onClick={reviews} className="btn">Reviews</button>
            </div>
        </div>
    );
};

export default AppDetail;