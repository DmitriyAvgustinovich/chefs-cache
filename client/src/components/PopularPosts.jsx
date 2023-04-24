import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/PopularPosts.css'

export const PopularPosts = ({ post }) => {
    return (
        <div className='popular-posts__wrapper'>
            <Link
                to={`${post._id}`}
                className='popular-posts__item'
            >
                {post.title}
            </Link>
        </div>
    )
}