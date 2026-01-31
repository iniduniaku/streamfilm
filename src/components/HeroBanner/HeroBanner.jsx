import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (!items || items.length === 0) {
    return (
      <div className="hero-banner">
        <div className="hero-skeleton"></div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="hero-banner">
      <div className="hero-slide" key={currentIndex}>
        <div className="hero-background">
          <img src={currentItem.poster} alt={currentItem.title} />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">{currentItem.title}</h1>
            
            <div className="hero-meta">
              {currentItem.rating && (
                <span className="hero-rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  {currentItem.rating}
                </span>
              )}
              {currentItem.year && <span>{currentItem.year}</span>}
              {currentItem.type && (
                <span className="hero-type">
                  {currentItem.type === 'movie' ? 'Film' : 'Series'}
                </span>
              )}
              {currentItem.genre && <span>{currentItem.genre}</span>}
            </div>

            {currentItem.description && (
              <p className="hero-description">
                {currentItem.description.length > 200
                  ? currentItem.description.substring(0, 200) + '...'
                  : currentItem.description}
              </p>
            )}

            <div className="hero-actions">
              <Link to={`/detail/${currentItem.detailPath}`} className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Tonton Sekarang
              </Link>
              <Link to={`/detail/${currentItem.detailPath}`} className="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                Info Selengkapnya
              </Link>
            </div>
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button className="hero-nav hero-prev" onClick={handlePrev} aria-label="Previous">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className="hero-nav hero-next" onClick={handleNext} aria-label="Next">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>

            <div className="hero-indicators">
              {items.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
