import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../redux/features/post/postSlice'
import {
  AiOutlineFolderAdd,
  AiOutlineClose,
  AiFillExclamationCircle,
  AiOutlinePushpin,
} from 'react-icons/ai'
import '../assets/css/AddPostPage.css'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {

    try {

      if (!title || !text || !category) {
        setError(true);
        return;
      }

      const data = new FormData()
      data.append('title', title)
      data.append('category', category)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
      toast('Рецепт был добавлен')

    } catch (error) {
      console.log(error)
    }

  }

  const clearFormHandler = () => {
    setCategory('')
    setText('')
    setTitle('')
    navigate('/')
  }

  return (
    <form
      className='form-add'
      onSubmit={(e) => e.preventDefault()}>
      <div className="form-add__wrapper">

        <label className='form-add__pin-img'>
          <span><AiOutlinePushpin /></span>
          Прикрепить фотографию готового блюда
          <input
            type='file'
            className='hidden'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <div className=''>
          {image && (
            <img src={URL.createObjectURL(image)} alt={image.name} />
          )}
        </div>

        <div className="form-add-text__wrapper">
          <div className='form-add__category'>
            Категория:

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-add__input-filter">

              <option value="">Выберите категорию</option>
              <option value="Завтрак">Завтрак</option>
              <option value="Обед">Обед</option>
              <option value="Ужин">Ужин</option>
              <option value="Выпечка">Выпечка</option>
              <option value="Салат">Салат</option>
              <option value="Десерт">Десерт</option>
            </select>
          </div>

          <div className='form-add__title'>
            Название блюда:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Название блюда..'
              className=''
            />
          </div>

          <div className='form-add__text'>
            Описание рецепта:

            <div className='form-add__text-help'>
              <span><AiFillExclamationCircle /></span>
              В поле ввода для описания рецепта не забудьте упомянуть:
            </div>

            <div className='form-add__text-help__list'>
              <span>1)</span> Время приготовления:
              <ul className="form-add__text-help__list-item">
                <li>опишите, через сколько блюдо будет готово, с&nbsp;использованием духовой печи или без неё;</li>
              </ul>

              <p className="form-add__text-help__list-title"><span>2)</span> Ингредиенты:</p>
              <ul className="form-add__text-help__list-item">
                <li>опишите, какой именно продукт пригодится для&nbsp;блюда, в&nbsp;каких количествах, консистенции;</li>
              </ul>

              <p className="form-add__text-help__list-title"><span>3)</span> Как приготовить:</p>
              <ul className="form-add__text-help__list-item">
                <li>пошаговая инструкция &mdash; распишите по пунктам каждый этап приготовления блюда;</li>
              </ul>
            </div>

            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder='Описание рецепта блюда..'
              className=''
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </div>

          <div className='add-cancel-btns__wrapper'>
            <button
              onClick={submitHandler}
              className='add-btn'
            >
              <AiOutlineFolderAdd />
              Добавить
            </button>

            <button
              onClick={clearFormHandler}
              className='add-cancel'
            >
              <AiOutlineClose />
              Отменить
            </button>
          </div>

          {error && (
            <div className="form-add__error-message">
              <span><AiFillExclamationCircle /></span>
              Заполните поля: Название, Категория и Описание рецепта
            </div>
          )}

        </div>

      </div>
    </form>
  )
}