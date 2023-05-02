import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AiFillEye,
  AiTwotoneEdit,
  AiFillDelete,
  AiOutlineRollback
} from 'react-icons/ai'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import '../assets/css/PostPage.css'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'

export const PostPage = () => {

  const [post, setPost] = useState(null)

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {

    try {

      dispatch(removePost(params.id))
      toast('Рецепт был удален')
      navigate('/')

    } catch (error) {
      console.log(error)
    }

  }

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Загрузка..
      </div>
    )
  }

  return (
    <div>
      <div className='post-page'>
        <div className='post-page__wrapper'>

          <div className="button-back__wrapper">
            <button className='button-back__btn'>
              <  AiOutlineRollback />
              <Link className='button-back__item' to={'/'}>
                Назад
              </Link>
            </button>
          </div>

          <div
            className={
              post.imgUrl ? '' : ''
            }
          >
            {post.imgUrl && (
              <img
                src={`${process.env.REACT_APP_API_ORIGIN}/${post.imgUrl}`}
                alt='img'
                className='post-page__img'
              />
            )}
          </div>

          <div className="post-page__text-wrapper">

            <div className="post-page-username__wrapper">
              Автор рецепта:&nbsp;
              <div className='post-page-username__item'>
                {post.username}
              </div>
            </div>

            <div className="post-page-date__wrapper">
              Дата публикации:&nbsp;
              <div className='post-page-date__item'>
                <Moment date={post.createdAt} format='D MMM YYYY' />
              </div>
            </div>

            <div className='post-page__category'>{post.category}</div>
            <div className='post-page__title'>{post.title}</div>
            
            <p className='post-page__description'
              style={{ whiteSpace: 'pre-wrap' }}>
              {post.text}</p>

            <div className='posts-views__wrapper'>
              <button className='posts-views__item'>Просмотры:&nbsp;
                <AiFillEye /> <span>{post.views}</span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className='button-del-edit__wrapper'>

                <Link className='button-edit__btn' to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                  <button className='button-edit__item'>Редактировать рецепт</button>
                </Link>

                <button
                  onClick={removePostHandler}
                  className='button-delete__btn'>
                  <AiFillDelete />
                  <div className="button-delete__item">
                    Удалить рецепт
                  </div>
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
