const Dropdown = ({ hidden, user, list, profile, logout }) => {
    return (
        <div className="dropdown" style={{ display: hidden ? 'none' : '' }}>
            <div className="link">
                {user?.username || "Anonymous"}
            </div>
            <div onClick={profile} className="link">
                Profile
            </div>
            {user?.active &&
                (user.role === 'admin' || user.role === 'developer') &&
                <div onClick={list} className="link">
                    List App
            </div>}
            <div onClick={logout} className="link">
                Logout
            </div>
        </div>
    );
};

export default Dropdown;