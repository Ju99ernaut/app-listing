const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const config = {
    apiEndpoint: API_ENDPOINT || 'http://localhost:8000/',
    coingeckoEndpoint: 'https://api.coingecko.com/api/v3/'
}

export default config;