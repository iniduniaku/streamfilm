import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import api from '../../services/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const categoryNames = {
    'trending': 'Trending',
    'indonesian-movies': 'Film Indonesia',
    'indonesian-drama': 'Drama Indonesia',
    'kdrama': 'K-Drama',
    'short-tv': 'Short TV',
    'anime': 'Anime'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setItems([]);
    setPage(1);
    setHasMore(true);
    loadContent(1);
  }, [category]);

  const loadContent = async (pageNum) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await api.getByCategory(category, pageNum);
      if (data.success && data.items) {
        if (pageNum === 1) {
          setItems(data.items);
        } else {
          setItems(prev => [...prev, ...data.items]);
        }
        setHasMore(data.hasMore || false);
      }
    } catch (error) {
      console.error('Error loading category:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadContent(nextPage);
  };

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="container">
          <h1 className="category-title">{categoryNames[category] || category}</h1>
          <p className="category-subtitle">
            {items.length > 0 && `${items.length}+ konten tersedia`}
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <MovieGrid items={items} loading={loading} />
          
          {!loading && hasMore && (
            <div className="load-more-container">
              <button 
                className="load-more-btn" 
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <div className="spinner-small"></div>
                    Loading...
                  </>
                ) : (
                  'Muat Lebih Banyak'
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CategoryPage;
