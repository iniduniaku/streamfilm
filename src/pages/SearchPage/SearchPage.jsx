import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import api from '../../services/api';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
    if (query) {
      performSearch(query);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput && searchInput !== query) {
        window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchInput)}`);
        performSearch(searchInput);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await api.search(searchQuery);
      if (data.success && data.items) {
        setItems(data.items);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-hero">
        <div className="container">
          <h1 className="search-title">Pencarian</h1>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Cari film, series, anime..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
            <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          {query && !loading && (
            <p className="search-results-text">
              {items.length > 0 
                ? `Ditemukan ${items.length} hasil untuk "${query}"`
                : `Tidak ada hasil untuk "${query}"`
              }
            </p>
          )}
        </div>
      </div>

      <div className="container">
        <section className="section">
          {loading ? (
            <MovieGrid items={[]} loading={true} />
          ) : query ? (
            <MovieGrid items={items} loading={false} />
          ) : (
            <div className="search-empty">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h3>Mulai Pencarian</h3>
              <p>Ketik kata kunci untuk mencari film atau series favorit Anda</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
