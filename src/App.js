import React from 'react';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      username: null,
      user: null,
    };
  }

  componentDidMount() {
    this._autoLogin();
  }

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

  _logout = () => {
    this.setState({
      token: null,
      username: null,
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
  }

  _authenticated = () => {
    return !!this.state.token;
  }

  _getUser = () => {
    return this.state.user
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Grid />
        <Footer />
      </div>
    );
  }
}

export default App;
