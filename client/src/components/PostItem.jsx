import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import '../assets/css/PostItem.css'
import { useState } from "react";

export const PostItem = ({ post }) => {

    const [showAll] = useState(false);

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка..
            </div>
        )
    }
    return (
        <Link to={`/${post._id}`}>
            <div className='posts-list'>

                <div className="posts-list__wrapper">
                    <div
                        className={
                            post.imgUrl ? '' : ''
                        }
                    >
                        {post.imgUrl && (
                            <img
                                src={`${process.env.REACT_APP_API_ORIGIN}/api/${post.imgUrl}`}
                                alt='img'
                                className='posts-list__img'
                            />
                        )}
                    </div>

                    <div className="posts-lists__text-wrapper">

                        <div className='posts-list__username-wrapper'>
                            <div className='posts-list__username-item'>
                                Автор рецепта:&nbsp;{post.username}
                            </div>

                            <div className='posts-list__date'>
                                Дата публикации:&nbsp;<Moment date={post.createdAt} format='D MMM YYYY' />
                            </div>
                        </div>

                        <div className='posts-list__category'>{post.category}</div>
                        <div className='posts-list__title'>{post.title}</div>

                        <div className='posts-list__description'>
                            <p style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                "WebkitLineClamp": showAll ? "unset" : "5",
                                "WebkitBoxOrient": "vertical",
                            }}>
                                {post.text}
                            </p>
                        </div>

                        <div className='posts-views__wrapper'>
                            Просмотры:&nbsp;<button className='posts-views__item'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </Link>
    )
}