import { useRef } from 'react';
import fetch from '../utils/fetch';

const RegisterForm = () => {
    const formRegister = useRef(null);

    const submitReg = e => {
        e.preventDefault();
        fetch('/register', { method: 'POST', body: new FormData(formRegister.current) })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log("Networt error"));
        formRegister.current.reset();
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