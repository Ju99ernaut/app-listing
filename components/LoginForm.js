import { useRef } from 'react';
import fetch from '../utils/fetch';
import config from '../config';

const LoginForm = ({ login, close }) => {
    const formLogin = useRef(null);

    const submitLogin = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}auth`, { method: 'POST', body: new FormData(formLogin.current) })
            .then(res => res.json())
            .then(res => {
                login(res);
                console.log(res);
                close();
            })
            .catch(err => console.log("Networt error"));
        formLogin.current.reset();
    }

    return (
        <form ref={formLogin} onSubmit={submitLogin}>
            <input type="text" id="username" name="username" placeholder="username" required />
            <input type="password" id="password" name="password" placeholder="password" required />
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;