import React from 'react';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Footer from './components/Footer';
import Modal from './components/Modal';
import fetch from './utils/fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.mdlLogin = React.createRef();
    this.mdlRegister = React.createRef();
    this.mdlList = React.createRef();
    this.mdlProfile = React.createRef();
    this.formLogin = React.createRef();
    this.formRegister = React.createRef();
    this.formList = React.createRef();
    this.state = {
      token: null,
      username: null,
      user: null,
    };
  }

  componentDidMount() {
    this._autoLogin();
  }

  showMdlLogin = () => {
    this.mdlLogin.current.show();
  }

  hideMdlLogin = () => {
    this.mdlLogin.current.hide();
  }

  showMdlReg = () => {
    this.mdlRegister.current.show();
  }

  hideMdlReg = () => {
    this.mdlRegister.current.hide();
  }

  showMdlList = () => {
    this.mdlList.current.show();
  }

  hideMdlList = () => {
    this.mdlList.current.hide();
  }

  showMdlProfile = () => {
    this.mdlProfile.current.show();
  }

  hideMdlProfile = () => {
    this.mdlProfile.current.hide();
  }

  submitLogin = e => {
    e.preventDefault();
    fetch('/auth', { method: 'POST', body: new FormData(this.formLogin.current) })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log("Networt error"));
    this.formLogin.current.reset();
    this.hideMdlLogin();
  }

  submitReg = e => {
    e.preventDefault();
    fetch('/register', { method: 'POST', body: new FormData(this.formRegister.current) })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log("Networt error"));
    this.formRegister.current.reset();
    this.hideMdlReg();
  }

  submitListing = e => {
    e.preventDefault();
    fetch('/listings', { method: 'POST', body: new FormData(this.formList.current) })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log("Networt error"));
    this.formList.current.reset();
    this.hideMdlReg();
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
        <Navbar username={this.state.username} loginMd={this.showMdlLogin} regMd={this.showMdlReg} listMd={this.showMdlList} profileMd={this.showMdlProfile} logout={this.logout} />
        <Grid profileMd={this.showMdlProfile} />
        <Footer />
        <Modal ref={this.mdlLogin} className="modal" keyboard={true}>
          <h2>Login</h2>
          <form ref={this.formLogin} onSubmit={this.submitLogin}>
            <input type="text" id="username" name="username" placeholder="username" required />
            <input type="password" id="password" name="password" placeholder="password" required />
            <input type="submit" value="Login" />
          </form>
          <button name="close" className="btn btn-close" onClick={this.hideMdlLogin}>×</button>
        </Modal>
        <Modal ref={this.mdlRegister} className="modal" keyboard={true}>
          <h2>Register</h2>
          <form ref={this.formRegister} onSubmit={this.submitReg}>
            <input type="text" id="username2" name="username2" placeholder="username" required />
            <input type="text" id="email" name="email" placeholder="email" />
            <input type="password" id="password2" name="password2" placeholder="password" />
            <input type="submit" value="Register" />
          </form>
          <button name="close" className="btn btn-close" onClick={this.hideMdlReg}>×</button>
        </Modal>
        <Modal ref={this.mdlList} className="modal" keyboard={true}>
          <h2>List App</h2>
          <form ref={this.formList} onSubmit={this.submitListing}>
            <input type="text" id="title" name="title" placeholder="title" required />
            <input type="text" id="image" name="image" placeholder="image url" required />
            <textarea name="description" id="description" placeholder="description" required></textarea>
            <input type="text" id="by" name="by" placeholder="by" required />
            <select id="groups" data-placeholder="Select categories for your app.." multiple name="groups" required>
              <option>Twitch</option>
              <option>Discord</option>
              <option>Facebook</option>
              <option>Bots</option>
              <option>Tools</option>
              <option>Viewers Interaction</option>
            </select>
            <input type="submit" value="Add Listing" />
          </form>
          <button name="close" className="btn btn-close" onClick={this.hideMdlList}>×</button>
        </Modal>
        <Modal ref={this.mdlProfile} className="modal" keyboard={true}>
          <h2>User Profile</h2>
          <div className="username">Username</div>
          <div className="email">user@email.me</div>
          <div className="listed-apps">Your app listings</div>
          <div className="your-reviews">Your reviews</div>
          <button name="close" className="btn btn-close" onClick={this.hideMdlProfile}>×</button>
        </Modal>
      </div>
    );
  }
}

export default App;
