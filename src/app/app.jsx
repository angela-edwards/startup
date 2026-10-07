import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Character } from './character/character';
import { Menu } from './menu/menu';
import { Loading } from '../loading/loading';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body">
                <header className="site-header">
                    <div className='site-title'>
                        <NavLink to="/">Divergent Threads</NavLink>
                    </div>

                    <nav className="site-nav">
                        <NavLink to="/">home</NavLink>
                        <NavLink to="/login">login</NavLink>
                        <NavLink to="/character">character</NavLink>
                        <NavLink to="/menu">main menu</NavLink>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Loading />} exact />
                    <Route path='/login' element={<Login />} />
                    <Route path='/character' element={<Character />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="menu-footer">
                    <span>Angela Edwards</span>
                    <a href="https://github.com/angela-edwards/startup" target="_blank" rel="noreferrer">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return ( <main className="container-fluid text-center">404: Return to sender. Address unknown.</main>
  );
}