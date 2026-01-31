import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="movie-grid">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="movie-card skeleton">
            <div className="movie-poster"></div>
            <div className="movie-info">
              <div className="skeleton-title"></div>
              <div className="skeleton-meta"></div>
              <div className="skeleton-genre"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
        </svg>
        <h3>Tidak ada konten ditemukan</h3>
        <p>Coba kategori lain atau gunakan pencarian</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {items.map((item, index) => (
        <MovieCard key={`${item.id}-${index}`} item={item} />
      ))}
    </div>
  );
};

export default MovieGrid;
