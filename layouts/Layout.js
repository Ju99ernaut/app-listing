import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Base/Footer';
import Modal from '../components/Modal';
import LoginForm from '../components/Form/LoginForm';
import RegisterForm from '../components/Form/RegisterForm';
import ListForm from '../components/Form/ListForm';
import UpdateForm from '../components/Form/UpdateListingForm';
import Profile from '../components/Profile';
import { LayoutProvider } from '../contexts/LayoutContext';
import config from '../config';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.mdlLogin = React.createRef();
        this.mdlRegister = React.createRef();
        this.mdlList = React.createRef();
        this.mdlUpdate = React.createRef();
        this.mdlProfile = React.createRef();
        this.state = {
            token: null,
            username: null,
            user: null,
            currentApp: null,
            userApps: [],
            userRatings: [],
            msg: '',
        };
    }

    componentDidMount() {
        //this._autoLogin();
        const frag = new URLSearchParams(window.location.hash.slice(1));
        window.location.hash = "";
        history.pushState('', document.title, `${window.location.pathname}${window.location.search}`);
        if (frag.has('status')) {
            const status = frag.get('status');
            if (status === "confirmed") {
                this.setState({
                    msg: 'Account has been successfully activated, proceed to login...'
                });
            } else {
                this.setState({
                    msg: 'Account activation failed, the link may have expired, you can get a new one from the profile modal...'
                });
            }
        } else {
            this.setState({
                msg: ''
            });
        }
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
            case 'update':
                this.mdlUpdate.current.show();
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
            case 'update':
                this.mdlUpdate.current.hide();
                break;
            default:
                break;
        }
    }

    openUpdate = (app) => {
        this.setState({
            currentApp: app
        });
        this.showMdl('update');
    }

    login = ({ access_token, token_type, expires_in }) => {
        const authorization = `${token_type} ${access_token}`;
        setTimeout(this.logout, (expires_in - 90) * 1000);
        fetch(`${config.apiEndpoint}users/me`, {
            headers: new Headers({ authorization })
        })
            .then(res => res.json())
            .then(res => {
                this._login(authorization, res);
            })
            .catch(err => console.log("Networt error"));
    }

    _authenticate = (token, user) => {
        this.setState({
            token,
            user,
            username: user.username
        }, this.myData);
    }

    _login = (token, user) => {
        //localStorage.setItem('token', token);
        //localStorage.setItem('username', user.username);
        //localStorage.setItem('user', JSON.stringify(user));
        this._authenticate(token, user);
    }

    //_autoLogin = () => {
    //    const token = localStorage.getItem('token');
    //    if (!token) return;
    //    const user = JSON.parse(localStorage.getItem('user'));
    //    this._authenticate(token, user);
    //}

    myData = () => {
        this._loadApps();
        this._loadRatings();
    };

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
            })
            .catch(err => console.log("Networt error"));
    }

    logout = () => {
        this.setState({
            token: null,
            username: null,
            user: null
        });
        //localStorage.removeItem('token');
        //localStorage.removeItem('username');
        //localStorage.removeItem('user');
    }

    authenticated = () => {
        return !!this.state.token;
    }

    getUser = () => {
        return this.state.user
    }

    render() {
        const { user, token } = this.state;
        const { authenticated, showMdl, myData } = this;

        return (
            <LayoutProvider value={{ user, token, authenticated, showMdl, myData }}>
                <Navbar auth={authenticated} user={user} loginMd={() => showMdl('login')} regMd={() => showMdl('register')} listMd={() => showMdl('list')} profileMd={() => showMdl('profile')} logout={this.logout} />
                {user && !user?.active && (
                    <div style={{ padding: '1em' }}>
                        <p className="info">A confirmation link has been sent to your email. The link will expire after one hour. You can get a new link from the profile modal.</p>
                    </div>
                )}
                {!user && this.state.msg && (
                    <div style={{ padding: '1em' }}>
                        <p className="info">{this.state.msg}</p>
                    </div>
                )}
                {this.props.children}
                <Footer />
                <Modal ref={this.mdlLogin} className="modal sm" keyboard={true}>
                    <h2>Login</h2>
                    <LoginForm login={this.login} close={() => this.hideMdl('login')} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('login')}>×</button>
                </Modal>
                <Modal ref={this.mdlRegister} className="modal sm" keyboard={true}>
                    <h2>Register</h2>
                    <RegisterForm login={this.login} close={() => this.hideMdl('register')} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('register')}>×</button>
                </Modal>
                <Modal ref={this.mdlList} className="modal" keyboard={true}>
                    <h2>List App</h2>
                    <ListForm authorization={token} close={() => this.hideMdl('list')} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('list')}>×</button>
                </Modal>
                <Modal ref={this.mdlUpdate} className="modal" keyboard={true}>
                    <h2>Update App</h2>
                    <UpdateForm app={this.state.currentApp} authorization={token} close={() => this.hideMdl('update')} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('update')}>×</button>
                </Modal>
                <Modal ref={this.mdlProfile} className="modal lg" keyboard={true}>
                    <h2>User Profile</h2>
                    <Profile user={user} authorization={token} apps={this.state.userApps} ratings={this.state.userRatings} close={() => this.hideMdl('profile')} openUpdate={this.openUpdate} reload={myData} />
                    <button name="close" className="btn btn-close" onClick={() => this.hideMdl('profile')}>×</button>
                </Modal>
            </LayoutProvider>
        );
    }
}

export default Layout;