import '../App.css'
import React, { FC, useContext, useState } from "react";
import { Context } from "../index";
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return(
        <div className="container">
            <div className='form-block'>
            <input 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Введите пароль"
            />
            <button onClick={() => {store.login(email, password)}}>Войти</button>
            <button onClick={() => {store.registration(email, password)}}>Зарегистрироваться</button>
            </div>
        </div>
    )
}

export default observer(LoginForm)