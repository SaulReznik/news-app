const baseURL = source => {
    return `http://newsapi.org/v2/top-headlines?apiKey=197bf696b52f4fa98406e1c34a0cf724&sources=${source}`
};

export default baseURL;