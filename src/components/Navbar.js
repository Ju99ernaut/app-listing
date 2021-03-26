import React from 'react';
import PriceTicker from './PriceTicker';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.a = "a";
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar">
                    <div className="logo-container">
                        <div className="logo">
                            <a href="./"><img src="logo512.png" alt="logo" /></a>
                            <div>React<br />Marketplace</div>
                        </div>
                        <PriceTicker icon="logo512.png" price="1.2334" coin="$REACT" increase={true} change="17.34%" />
                    </div>
                    <div className="profile-container">
                        <button className="btn btn-login">Login</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Navbar;