import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import '../assets/css/RegisterPage.css'

export const RegisterPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={e => e.preventDefault()}
      className='form'>
      <div>

        <p className="form__logo">Chef's <br />Cache</p>

        <div className='form__wrapper'>
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
            <button
              type='submit'
              onClick={handleSubmit}
              className='form__buttons-item'>
              Зарегистрироваться
            </button>

            <Link
              to='/login'
              className='form__buttons-item'
            >Есть аккаунт ? </Link>

          </div>
        </div>

      </div>
    </form>
  )
}
