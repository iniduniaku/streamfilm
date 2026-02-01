import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './DetailPage.css';

const DetailPage = () => {
  const { detailPath } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDetail();
  }, [detailPath]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await api.getDetail(detailPath);
      if (data.success) {
        setDetail(data);
        // Auto select first season and episode for TV series
        if (data.type === 'tv' && data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
          if (data.seasons[0].episodes && data.seasons[0].episodes.length > 0) {
            setSelectedEpisode(data.seasons[0].episodes[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    if (season.episodes && season.episodes.length > 0) {
      setSelectedEpisode(season.episodes[0]);
    }
  };

  const handlePlayClick = (playerUrl) => {
    if (playerUrl) {
      setShowPlayer(true);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-skeleton"></div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="detail-page">
        <div className="container">
          <div className="detail-error">
            <h2>Konten tidak ditemukan</h2>
          </div>
        </div>
      </div>
    );
  }

  const currentPlayerUrl = detail.type === 'tv' 
    ? selectedEpisode?.playerUrl 
    : detail.playerUrl;

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <div className="detail-backdrop">
          <img src={detail.poster} alt={detail.title} />
          <div className="detail-overlay"></div>
        </div>

        <div className="detail-content">
          <div className="container">
            <div className="detail-main">
              <div className="detail-poster">
                <img src={detail.poster} alt={detail.title} />
              </div>

              <div className="detail-info">
                <h1 className="detail-title">{detail.title}</h1>

                <div className="detail-meta">
                  {detail.rating && (
                    <span className="detail-rating">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {detail.rating}
                    </span>
                  )}
                  {detail.year && <span>{detail.year}</span>}
                  {detail.type && (
                    <span className="detail-type">
                      {detail.type === 'movie' ? 'Film' : 'Series'}
                    </span>
                  )}
                  {detail.duration && <span>{detail.duration}</span>}
                </div>

                {detail.genre && (
                  <div className="detail-genres">
                    {detail.genre.split(',').map((genre, index) => (
                      <span key={index} className="genre-tag">{genre.trim()}</span>
                    ))}
                  </div>
                )}

                {detail.description && (
                  <p className="detail-description">{detail.description}</p>
                )}

                {detail.cast && (
                  <div className="detail-cast">
                    <strong>Pemain:</strong> {detail.cast}
                  </div>
                )}

                {detail.director && (
                  <div className="detail-director">
                    <strong>Sutradara:</strong> {detail.director}
                  </div>
                )}

                <div className="detail-actions">
                  {currentPlayerUrl && !showPlayer && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handlePlayClick(currentPlayerUrl)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Tonton Sekarang
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {showPlayer && currentPlayerUrl && (
          <div className="player-container">
            <button 
              className="close-player"
              onClick={() => setShowPlayer(false)}
            >
              ✕ Tutup Player
            </button>
            <iframe
              src={currentPlayerUrl}
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              title="Video Player"
            />
          </div>
        )}

        {detail.type === 'tv' && detail.seasons && detail.seasons.length > 0 && (
          <section className="episodes-section">
            <h2 className="section-title">Episode</h2>
            
            <div className="season-selector">
              {detail.seasons.map((season, index) => (
                <button
                  key={index}
                  className={`season-btn ${selectedSeason === season ? 'active' : ''}`}
                  onClick={() => handleSeasonChange(season)}
                >
                  {season.name || `Season ${index + 1}`}
                </button>
              ))}
            </div>

            {selectedSeason && selectedSeason.episodes && (
              <div className="episodes-grid">
                {selectedSeason.episodes.map((episode, index) => (
                  <div
                    key={index}
                    className={`episode-card ${selectedEpisode === episode ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedEpisode(episode);
                      setShowPlayer(false);
                    }}
                  >
                    <div className="episode-number">EP {index + 1}</div>
                    <div className="episode-info">
                      <h4 className="episode-title">
                        {episode.title || `Episode ${index + 1}`}
                      </h4>
                      {episode.description && (
                        <p className="episode-description">{episode.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
