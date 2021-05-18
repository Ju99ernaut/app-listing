import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ListForm from '../components/ListForm';
import Profile from '../components/Profile';
import { LayoutProvider } from '../contexts/LayoutContext';
import config from '../config';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.mdlLogin = React.createRef();
        this.mdlRegister = React.createRef();
        this.mdlList = React.createRef();
        this.mdlProfile = React.createRef();
        this.state = {
            token: null,
            username: null,
            user: null,
            userApps: [],
            userRatings: [],
        };
    }
    componentDidMount() {
        this._autoLogin();
    }

    showMdl = (mdl) => {
        switch (mdl) {
            case 'login':
                this.mdlLogin.current.show();
                break;
            case 'register':
                this.mdlRegister.current.show();
                break;
            case 'list':
                this.mdlList.current.show();
                break;
            case 'profile':
                this.mdlProfile.current.show();
                break;
            default:
                break;
        }
    }

    hideMdl = (mdl) => {
        switch (mdl) {
            case 'login':
                this.mdlLogin.current.hide();
                break;
            case 'register':
                this.mdlRegister.current.hide();
                break;
            case 'list':
                this.mdlList.current.hide();
                break;
            case 'profile':
                this.mdlProfile.current.hide();
                break;
            default:
                break;
        }
    }

    login = ({ access_token, token_type }) => {
        const authorization = `${token_type} ${access_token}`;
        fetch(`${config.apiEndpoint}users/me`, {
            headers: new Headers({ authorization })
        })
            .then(res => res.json())
            .then(res => {
                this._login(authorization, res);
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    }

    _authenticate = (token, user) => {
        const myData = () => {
            this._loadApps();
            this._loadRatings();
        };
        this.setState({
            token,
            user,
            username: user.username
        }, myData);
    }

    _login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user', JSON.stringify(user));
        this._authenticate(token, user);
    }

    _autoLogin = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const user = JSON.parse(localStorage.getItem('user'));
        this._authenticate(token, user);
    }

    _loadApps = () => {
        fetch(`${config.apiEndpoint}apps/me`, {
            headers: new Headers({ authorization: this.state.token })
        })
            .then(res => {
                if (!res.ok) {
                    this.logout();
                    throw new Error("Token expired");
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    userApps: res
                });
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    }

    _loadRatings = () => {
        fetch(`${config.apiEndpoint}ratings/me`, {
            headers: new Headers({ authorization: this.state.token })
        })
            .then(res => {
                if (!res.ok) {
                    this.logout();
                    throw new Error("Token expired");
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    userRatings: res
                });
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    }

    logout = () => {
        this.setState({
            token: null,
            username: null,
            user: null
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user');
    }

    authenticated = () => {
        return !!this.state.token;
    }

    getUser = () => {
        return this.state.user
    }
    render() {
        const { user, token } = this.state;
        const { authenticated, showMdl } = this;

        return (
            <LayoutProvider value={{ user, token, authenticated, showMdl }}>
                <Navbar auth={this.authenticated} username={this.state.username} loginMd={() => this.showMdl('login')} regMd={() => this.showMdl('register')} listMd={() => this.showMdl('list')} profileMd={() => this.showMdl('profile')} logout={this.logout} />
                {this.props.children}
                <Footer />
                <Modal ref={this.mdlLogin} className="modal" keyboard={true}>
                    <h2>Login</h2>
                    <LoginForm login={this.login} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('login')}>×</button>
                </Modal>
                <Modal ref={this.mdlRegister} className="modal" keyboard={true}>
                    <h2>Register</h2>
                    <RegisterForm login={this.login} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('register')}>×</button>
                </Modal>
                <Modal ref={this.mdlList} className="modal" keyboard={true}>
                    <h2>List App</h2>
                    <ListForm authorization={this.state.token} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('list')}>×</button>
                </Modal>
                <Modal ref={this.mdlProfile} className="modal" keyboard={true}>
                    <h2>User Profile</h2>
                    <Profile user={this.state.user} apps={this.state.userApps} ratings={this.state.userRatings} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('profile')}>×</button>
                </Modal>
            </LayoutProvider>
        );
    }
}

export default Layout;