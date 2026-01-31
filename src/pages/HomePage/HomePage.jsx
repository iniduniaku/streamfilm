import React, { useState, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import api from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [categories, setCategories] = useState({
    'indonesian-movies': { items: [], loading: true },
    'kdrama': { items: [], loading: true },
    'anime': { items: [], loading: true }
  });
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    loadTrending();
    loadCategories();
  }, []);

  const loadTrending = async () => {
    try {
      const data = await api.getTrending(1);
      if (data.success && data.items) {
        setTrendingItems(data.items.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading trending:', error);
    } finally {
      setHeroLoading(false);
    }
  };

  const loadCategories = async () => {
    const categoryKeys = ['indonesian-movies', 'kdrama', 'anime'];
    
    for (const key of categoryKeys) {
      try {
        const data = await api.getByCategory(key, 1);
        if (data.success && data.items) {
          setCategories(prev => ({
            ...prev,
            [key]: { items: data.items.slice(0, 8), loading: false }
          }));
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
        setCategories(prev => ({
          ...prev,
          [key]: { items: [], loading: false }
        }));
      }
    }
  };

  const categoryNames = {
    'indonesian-movies': 'Film Indonesia',
    'kdrama': 'K-Drama',
    'anime': 'Anime'
  };

  return (
    <div className="home-page">
      {heroLoading ? (
        <HeroBanner items={[]} />
      ) : (
        <HeroBanner items={trendingItems} />
      )}

      <div className="container">
        {Object.keys(categories).map((key) => (
          <section key={key} className="section">
            <div className="section-header">
              <h2 className="section-title">{categoryNames[key]}</h2>
              <a href={`/category/${key}`} className="section-link">
                Lihat Semua →
              </a>
            </div>
            <MovieGrid 
              items={categories[key].items} 
              loading={categories[key].loading}
            />
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
