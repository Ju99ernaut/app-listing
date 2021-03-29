import React from 'react';
import PriceTicker from './PriceTicker';
import Dropdown from './Dropdown';
import fetch from '../utils/fetch';
import querystring from 'querystring';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '0.0000',
            increase: true,
            change: '0.00%',
            dropdownHidden: true,
        };
    }

    componentDidMount() {
        this._refreshRallyPrice();
        setInterval(this._refreshRallyPrice, 60000);
    }

    toggleDropdown = () => {
        this.setState({
            dropdownHidden: !this.state.dropdownHidden
        });
    }

    _refreshRallyPrice = () => {
        const endpoint = `simple/price`;
        const chartParams = {
            ids: 'rally-2',
            vs_currencies: 'usd',
            include_24hr_change: true,
        };
        this._coinData(endpoint, chartParams, (res) => {
            this.setState({
                price: `$${res['rally-2'].usd.toFixed(4)}`,
                change: `${res['rally-2'].usd_24h_change.toFixed(2).toString()}%`,
                increase: res['rally-2'].usd_24h_change >= 0
            });
        });
    }

    _querystring(params = {}) {
        if (typeof params === 'object' && Object.keys(params).length) {
            return `?${querystring.stringify(params)}`;
        } else {
            return '';
        }
    }

    _coinData = (endpoint, params = {}, clb = () => { }) => {
        fetch(`https://api.coingecko.com/api/v3/${endpoint}${this._querystring(params)}`)
            .then((res) => res.json())
            .then((response) => {
                clb(response);
            })
            .catch(() => console.log("Failed to get market data."));
    };

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar">
                    <div className="logo-container">
                        <div className="logo">
                            <a href="./"><img src="rallyIcon.svg" alt="logo" /></a>
                            <div>Marketplace</div>
                        </div>
                        <PriceTicker icon="RLY.svg" coin="$RLY" price={this.state.price} increase={this.state.increase} change={this.state.change} />
                    </div>
                    <div className="profile-container">
                        <button onClick={this.props.loginMd} className="btn btn-login">Login</button>
                        <button onClick={this.props.regMd} className="btn btn-login">Register</button>
                        <svg onClick={this.toggleDropdown} viewBox="0 0 16 16" className="user-icon" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        <Dropdown hidden={this.state.dropdownHidden} username={this.props.username} profile={this.props.profileMd} logout={this.props.logout} />
                    </div>
                </div>
            </div>
        );
    }
};

export default Navbar;