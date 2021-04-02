import React from 'react';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ListForm from './components/ListForm';
import Profile from './components/Profile';

class App extends React.Component {
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

  login = () => { }

  register = () => { }

  _authenticate = (token, user) => {
    this.setState({
      token,
      user,
      username: user.username
    });
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
    return (
      <div className="App">
        <Navbar username={this.state.username} loginMd={() => this.showMdl('login')} regMd={() => this.showMdl('register')} listMd={() => this.showMdl('list')} profileMd={() => this.showMdl('profile')} logout={this.logout} />
        <Grid profileMd={() => this.showMdl('profile')} />
        <Footer />
        <Modal ref={this.mdlLogin} className="modal" keyboard={true}>
          <h2>Login</h2>
          <LoginForm />
          <button name="close" className="btn btn-close" onClick={() => this.hideMdl('login')}>×</button>
        </Modal>
        <Modal ref={this.mdlRegister} className="modal" keyboard={true}>
          <h2>Register</h2>
          <RegisterForm />
          <button name="close" className="btn btn-close" onClick={() => this.hideMdl('register')}>×</button>
        </Modal>
        <Modal ref={this.mdlList} className="modal" keyboard={true}>
          <h2>List App</h2>
          <ListForm />
          <button name="close" className="btn btn-close" onClick={() => this.hideMdl('list')}>×</button>
        </Modal>
        <Modal ref={this.mdlProfile} className="modal" keyboard={true}>
          <h2>User Profile</h2>
          <Profile />
          <button name="close" className="btn btn-close" onClick={() => this.hideMdl('profile')}>×</button>
        </Modal>
      </div>
    );
  }
}

export default App;
