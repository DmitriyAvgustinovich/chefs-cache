import React, { useEffect, useState } from 'react';
import { PostItem } from '../components/PostItem';
import axios from '../utils/axios';
import '../assets/css/PostsPage.css';
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai'

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Завтрак', 'Обед', 'Ужин', 'Выпечка', 'Салат', 'Десерт'];

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((post) =>
      !selectedCategory || post.category.toLowerCase() === selectedCategory.toLowerCase()
    );

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className='posts-page'>
      <div className='posts-page__wrapper'>

        <h1 className='posts-page-title'>
          Мои рецепты
        </h1>

        <h2 className='search-title-posts'>
          Поиск:
        </h2>

        <div className='input-search__wrapper-posts'>
          <p className="input-search__icon-posts">
            <AiOutlineSearch />
          </p>

          <input
            type='text'
            placeholder='Введите название блюда..'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='input-search__item-posts' />
        </div>

        <h2 className='filter-title-posts'>Категории:</h2>

        <div className='input-filter__wrapper-posts'>
          <p className='input-filter__icon-posts'>
            <AiOutlineFilter />
          </p>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='input-filter__item-posts'>

            <option value=''>Выберите категорию блюда..</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}

          </select>
        </div>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => (
            <PostItem post={post} key={idx} categories={categories} />
          ))
        ) : (
          <p className='error-search-posts'>
            Блюда не существует.
          </p>
        )}

      </div>
    </div>
  );
};