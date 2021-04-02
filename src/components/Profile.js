import Stars from './Stars';

const Profile = () => {
    return (
        <div>
            <div className="meta__by">Username</div>
            <div className="meta__by">user@email.me</div>
            <div className="listed-apps">Random App</div>
            <div className="your-reviews">
                <span>12/11/21</span>
                <div>Comment...</div>
                <Stars rating={4.5} edit={false} />
            </div>
        </div>
    );
};

export default Profile;