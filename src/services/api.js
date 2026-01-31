const BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

class APIService {
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTrending(page = 1) {
    return this.fetchData(`?action=trending&page=${page}`);
  }

  async getIndonesianMovies(page = 1) {
    return this.fetchData(`?action=indonesian-movies&page=${page}`);
  }

  async getIndonesianDrama(page = 1) {
    return this.fetchData(`?action=indonesian-drama&page=${page}`);
  }

  async getKDrama(page = 1) {
    return this.fetchData(`?action=kdrama&page=${page}`);
  }

  async getShortTV(page = 1) {
    return this.fetchData(`?action=short-tv&page=${page}`);
  }

  async getAnime(page = 1) {
    return this.fetchData(`?action=anime&page=${page}`);
  }

  async search(query) {
    return this.fetchData(`?action=search&q=${encodeURIComponent(query)}`);
  }

  async getDetail(detailPath) {
    return this.fetchData(`?action=detail&detailPath=${encodeURIComponent(detailPath)}`);
  }

  // Helper method to get content by category
  async getByCategory(category, page = 1) {
    const categoryMap = {
      'trending': this.getTrending.bind(this),
      'indonesian-movies': this.getIndonesianMovies.bind(this),
      'indonesian-drama': this.getIndonesianDrama.bind(this),
      'kdrama': this.getKDrama.bind(this),
      'short-tv': this.getShortTV.bind(this),
      'anime': this.getAnime.bind(this)
    };

    const fetchMethod = categoryMap[category];
    if (!fetchMethod) {
      throw new Error(`Unknown category: ${category}`);
    }

    return fetchMethod(page);
  }
}

export default new APIService();
