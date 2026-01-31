import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ item }) => {
  return (
    <Link to={`/detail/${item.detailPath}`} className="movie-card">
      <div className="movie-poster">
        <img src={item.poster} alt={item.title} loading="lazy" />
        <div className="movie-overlay">
          <div className="play-icon">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        {item.type && (
          <span className="movie-badge">
            {item.type === 'movie' ? 'Film' : 'Series'}
          </span>
        )}
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{item.title}</h3>
        <div className="movie-meta">
          {item.rating && (
            <span className="movie-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {item.rating}
            </span>
          )}
          {item.year && <span>{item.year}</span>}
        </div>
        {item.genre && <p className="movie-genre">{item.genre}</p>}
      </div>
    </Link>
  );
};

export default MovieCard;
