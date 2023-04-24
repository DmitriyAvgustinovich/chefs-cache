import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';
import { LoginPage } from '../pages/LoginPage';
import { PopularPosts } from '../components/PopularPosts';
import { PostItem } from '../components/PostItem';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import '../assets/css/MainPage.css';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);
  const isAuth = useSelector(checkIsAuth);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Завтрак', 'Обед', 'Ужин', 'Выпечка', 'Салат', 'Десерт'];

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((post) =>
      !selectedCategory || post.category.toLowerCase() === selectedCategory.toLowerCase()
    );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className='empty-posts-message'>
        Постов не существует.
      </div>
    );
  }

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <div className='main'>
      <div className='main__wrapper'>

        <h1 className='main-title'>Главная</h1>

        <h2 className='main__popular-title'>Популярные блюда:</h2>

        {popularPosts?.map((post, idx) => (
          <PopularPosts key={idx} post={post} />
        ))}

        <h2 className='search-title'>Поиск:</h2>

        <div className='input-search__wrapper'>
          <p className='input-search__icon'>
            <AiOutlineSearch />
          </p>

          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Введите название блюда..'
            className='input-search__item'
          />
        </div>

        <h2 className='filter-title'>Категории:</h2>

        <div className='input-filter__wrapper'>
          <p className='input-filter__icon'>
            <AiOutlineFilter />
          </p>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='input-filter__item'>

            <option value=''>Выберите категорию блюда..</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}

          </select>
        </div>

        <div className='main__post'>
          {filteredPosts.length === 0 && (
            <p className='error-search'>Блюда не существует.</p>
          )}

          {filteredPosts?.map((post, idx) => (
            <PostItem key={idx} post={post} categories={categories} />
          ))}
        </div>

      </div>
    </div>
  );
};