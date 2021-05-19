import { useRef } from 'react';
import fetch from '../utils/fetch';
import config from '../config';

const RegisterForm = ({ login }) => {
    const formRegister = useRef(null);

    const submitReg = e => {
        e.preventDefault();
        fetch(`${config.apiEndpoint}register`, { method: 'POST', body: new FormData(formRegister.current) })
            .then(res => res.json())
            .then(res => {
                fetch(`${config.apiEndpoint}auth`, { method: 'POST', body: new FormData(formRegister.current) })
                    .then(res => res.json())
                    .then(res => {
                        login(res);
                        console.log(res);
                    })
                    .catch(err => console.log("Networt error"));
                formRegister.current.reset();
                console.log(res);
            })
            .catch(err => console.log("Networt error"));
    }

    return (
        <form ref={formRegister} onSubmit={submitReg}>
            <input type="text" id="username2" name="username2" placeholder="username" required />
            <input type="text" id="email" name="email" placeholder="email" />
            <input type="password" id="password2" name="password2" placeholder="password" />
            <input type="submit" value="Register" />
        </form>
    );
};

export default RegisterForm;