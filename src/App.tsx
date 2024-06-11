import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import { IUser } from './models/IUser';
import Layout from './components/Layout';

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect( () => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data);

    } catch (err:any) {
      console.log(err)
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
        <LoginForm />
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h2>{store.isAuth ? `Пользователь авторизован ${store.user.email}`: 'Пожалуйста, авторизуйтесь'}</h2>
      <h3>{store.user.isActivated ? 'Подтвержденный аккаунт' : 'Пожалуйста, подтвердите аккаунт'}</h3>
      <button onClick={() => store.logout()}>Выйти</button>
      <div><button onClick={getUsers}>Показать всех пользователей</button></div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer (App);
