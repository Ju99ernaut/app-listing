import { useRef } from 'react';
import fetch from '../utils/fetch';

const LoginForm = () => {
    const formLogin = useRef(null);

    const submitLogin = e => {
        e.preventDefault();
        fetch('/auth', { method: 'POST', body: new FormData(formLogin.current) })
            .then(res => res.json())
            .then(res => console.log(res))
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