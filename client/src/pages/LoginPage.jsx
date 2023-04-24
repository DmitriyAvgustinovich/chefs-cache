import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import '../assets/css/LoginPage.css'

export const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    if (status) {
      toast(status)
    }

    if (isAuth) {
      navigate('/')
    }

  }, [status, isAuth, navigate])

  const handleSubmit = () => {

    try {
      dispatch(loginUser({ username, password }))

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={e => e.preventDefault()}
      className='form'>
      <div>

        <p className="form__logo">Chef's <br />Cache</p>

        <div className="form__wrapper">
          <label className='form__label'>
            <input type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Введите логин'
              className='form__input'
            />
          </label>

          <label className='form__label'>
            <input type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Введите пароль'
              className='form__input'
            />
          </label>

          <div className='form__buttons'>
            <button type='submit'
              onClick={handleSubmit}
              className='form__buttons-item'>
              Войти
            </button>

            <Link
              to='/register'
              className='form__buttons-item'
            >Нет аккаунта? </Link>

          </div>
        </div>

      </div>
    </form>
  )
}
