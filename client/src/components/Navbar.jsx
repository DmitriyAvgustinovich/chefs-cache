import React from 'react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import '../assets/css/Navbar.css'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineBook,
  AiOutlineUpload,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
    navigate('/login');
  };

  return (
    <div className="navbar">

      {isAuth && (
        <div className="adaptMenu__wrapper">
          <button className="adaptMenu-item" onClick={() => setIsOpen(true)}>

            <AiOutlineMenu />
            Меню
          </button>
          <p>
            <NavLink to={'/'} href="/" className="navbar__menu-logo">
              Chef's Cache
            </NavLink>
          </p>
        </div>
      )}

      {isAuth && (
        <>
          <nav className={`navbar__wrapper ${isOpen ? 'open' : ''}`}>
            <ul className="navbar__menu-wrapper">

              <li>
                <div
                  className="navbar__menu-link-close"
                  onClick={() => setIsOpen(false)}>
                  <AiOutlineClose />
                </div>
              </li>

              <li>
                <div className="navbar__menu-user-info">
                  <AiOutlineUser /> Ваш логин:<span>{user?.username}</span>
                </div>
              </li>

              <li>
                <NavLink
                  to={'/'}
                  href="/"
                  className="navbar__menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <AiOutlineHome />
                  Главная
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={'/posts'}
                  href="/"
                  className="navbar__menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <AiOutlineBook />
                  Мои рецепты
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={'/new'}
                  href="/"
                  className="navbar__menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  <AiOutlinePlus />
                  Добавить рецепт
                </NavLink>
              </li>

              <li>
                <div className="navbar__menu-link">
                  <AiOutlineUpload className='navbar__menu-link-logout-icon' />
                  {isAuth ? (
                    <button onClick={logoutHandler}>Выйти</button>
                  ) : (
                    <Link to={'/login'}> Войти </Link>
                  )}
                </div>
              </li>

            </ul>
          </nav>

          {isOpen && (
            <div
              className="navbar__menu-overlay"
              onClick={() => setIsOpen(false)}
            />
          )}

        </>
      )}

    </div>
  )
}