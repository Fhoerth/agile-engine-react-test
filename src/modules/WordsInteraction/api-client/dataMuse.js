import Axios from 'axios';
import config from './config.json';

class DataMuseAPIClient {
  static url = {
    word: word => `/words?rel_syn=${word.trim()}&s&max=5`,
  };

  constructor() {
    this.axiosInstance = Axios.create(config.api.dataMuse);
  }

  fetchSynonyms(word) {
    return this.axiosInstance
      .get(DataMuseAPIClient.url.word(word))
      .then(({ data }) => data);
   }
}

export default new DataMuseAPIClient();
