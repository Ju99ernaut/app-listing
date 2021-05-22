import { useRef, useState } from 'react';
import fetch from '../utils/fetch';
import config from '../config';

const RegisterForm = ({ login, close }) => {
    const formRegister = useRef(null);
    const [msg, setMsg] = useState("Registered...");
    const [showMsg, setShowMsg] = useState(false);

    const submitReg = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}register`, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(new FormData(formRegister.current)))
        })
            .then(res => res.json())
            .then(res => {
                if (res.detail) {
                    setMsg("Registration Failed");
                    setShowMsg(true);
                } else {
                    setMsg("Registered, attempting autologin");
                    setShowMsg(true);
                }
                fetch(`${config.apiEndpoint}auth`, { method: 'POST', body: new FormData(formRegister.current) })
                    .then(res => res.json())
                    .then(res => {
                        login(res);
                        console.log(res);
                        close();
                    });
                formRegister.current.reset();
                console.log(res);
            })
            .catch(err => {
                setMsg("Network error");
                setShowMsg(true);
            });
    }

    return (
        <form ref={formRegister} onSubmit={submitReg}>
            {showMsg && <p className="info">{msg}</p>}
            <input type="text" id="username2" name="username" placeholder="username" required />
            <input type="text" id="email" name="email" placeholder="email" />
            <input type="password" id="password2" name="password" placeholder="password" />
            <input type="submit" value="Register" />
        </form>
    );
};

export default RegisterForm;