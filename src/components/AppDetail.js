const AppDetail = ({ reviews }) => {
    return (
        <div className="app-expanded">
            <div className="app-image">
                <img src="demo.png" alt="app" />
            </div>
            <div className="app-details">
                <div className="meta__by">By Juggernaut</div>
                <div className="meta__by">Update 12/11/21</div>
                <div style={{ paddingTop: '.5rem' }} className="filters">
                    <button name="twitch" className="btn">Twitch</button>
                    <button name="discord" className="btn">Discord</button>
                </div>
                <p>A short description...</p>
                <button name="reviews" onClick={reviews} className="btn">Reviews</button>
            </div>
        </div>
    );
};

export default AppDetail;