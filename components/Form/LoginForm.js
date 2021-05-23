import { useRef, useState } from 'react';
import fetch from '../../utils/fetch';
import config from '../../config';

const LoginForm = ({ login, close }) => {
    const formLogin = useRef(null);
    const [msg, setMsg] = useState("Logged in");
    const [showMsg, setShowMsg] = useState(false);

    const submitLogin = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}auth`, { method: 'POST', body: new FormData(formLogin.current) })
            .then(res => res.json())
            .then(res => {
                if (res.detail) {
                    setMsg("Incorrect credentials");
                    setShowMsg(true);
                } else {
                    setMsg("Logged in");
                    setShowMsg(true);
                    login(res);
                    setTimeout(close, 1500);
                }
            })
            .catch(err => {
                setMsg("Network error");
                setShowMsg(true);
            });
        formLogin.current.reset();
    }

    return (
        <form ref={formLogin} onSubmit={submitLogin}>
            {showMsg && <p className="info">{msg}</p>}
            <input type="text" id="username" name="username" placeholder="username" required />
            <input type="password" id="password" name="password" placeholder="password" required />
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;