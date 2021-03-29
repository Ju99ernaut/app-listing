const Dropdown = ({ hidden, username, list, profile, logout }) => {
    return (
        <div className="dropdown" style={{ display: hidden ? 'none' : '' }}>
            <div className="link">
                {username || "Anonymous"}
            </div>
            <div onClick={profile} className="link">
                Profile
            </div>
            <div onClick={list} className="link">
                List App
            </div>
            <div onClick={logout} className="link">
                Logout
            </div>
        </div>
    );
};

export default Dropdown;