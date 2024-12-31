export default class TvMazeApi {
    static baseUrl = "https://api.tvmaze.com";
  
    static async searchShows(query) {
      const response = await fetch(`${this.baseUrl}/search/shows?q=${query}`);
      const data = await response.json();
      return data.map((item) => item.show);
    }
  
    static async getShowDetails(id) {
      const response = await fetch(`${this.baseUrl}/shows/${id}`);
      const data = await response.json();
      return data;
    }
  
    static async getAllShows() {
      const response = await fetch(`${this.baseUrl}/shows`);
      const data = await response.json();
      return data;
    }
  }
  