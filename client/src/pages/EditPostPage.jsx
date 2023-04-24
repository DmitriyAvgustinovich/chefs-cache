import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'
import '../assets/css/EditPostPage.css'
import {
  AiTwotoneEdit,
  AiOutlineClose,
  AiOutlineRollback,
  AiOutlinePushpin,
} from 'react-icons/ai'

export const EditPostPage = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)

    setTitle(data.title)
    setText(data.text)
    setCategory(data.category)
    setOldImage(data.imgUrl)

  }, [params.id])

  const submitHandler = () => {

    try {

      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('category', category)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')

    } catch (error) {
      console.log(error)
    }

  }

  const clearFormHandler = () => {
    setCategory('')
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form
      className='form-edit'
      onSubmit={(e) => e.preventDefault()}>
      <div className="form-edit__wrapper">

        <div className="button-back__wrapper">
          <button className='button-back__btn'>
            <  AiOutlineRollback />
            <Link className='button-back__item' to={'/'}>
              Назад
            </Link>
          </button>
        </div>

        <label className='form-edit__pin-img'>
          <span><AiOutlinePushpin /></span>
          Редактировать / Добавить фотографию готового блюда
          <input
            type='file'
            className='hidden'
            onChange={(e) => {
              setNewImage(e.target.files[0])
              setOldImage('')
            }}
          />
        </label>

        {oldImage && (
          <img className='form-edit__img-item' src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}

        {newImage && (
          <img className='form-edit__img-item' src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}

        <div className="form-edit-text__wrapper">
          <div className='form-edit__category'>
            Категория:

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-edit__input-filter">

              <option value="">Выберите категорию</option>
              <option value="Завтрак">Завтрак</option>
              <option value="Обед">Обед</option>
              <option value="Ужин">Ужин</option>
              <option value="Выпечка">Выпечка</option>
              <option value="Салат">Салат</option>
              <option value="Десерт">Десерт</option>
            </select>
          </div>

          <div className='form-edit__title'>
            Название блюда:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Название блюда..'
              className=''
            />
          </div>

          <div className='form-edit__text'>
            Описание рецепта:

            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder='Описание рецепта блюда..'
              className=''
            />
          </div>

          <div className='edit-cancel-btns__wrapper'>
            <button
              onClick={submitHandler}
              className='edit-btn'
            >
              < AiTwotoneEdit />
              Обновить
            </button>

            <button
              onClick={clearFormHandler}
              className='edit-cancel'
            >
              <AiOutlineClose />
              Удалить весь текст
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
