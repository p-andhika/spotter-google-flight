import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
});

export const searchAirports = async (query: string, locale: string = 'en-US') => {
  try {
    const response = await api.get('/api/v1/flights/searchAirport', {
      params: {
        query: query,
        locale: locale
      }
    });
    const airports = response.data.data;
    if (airports.length > 0) {
      return airports[0];
    } else {
      throw new Error('No airports found');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
    } else {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
    throw new Error('Failed to search airports');
  }
};


export const searchFlights = async (from: string, to: string, date: string) => {
  try {
    const { skyId: originSkyId, entityId: originEntityId } = await searchAirports(from);
    const { skyId: destinationSkyId, entityId: destinationEntityId } = await searchAirports(to);

    const response = await api.get('/api/v2/flights/searchFlights', {
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date: date,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      }
    });
    return response.data.data.itineraries;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
    } else {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
    throw new Error('Failed to search flights');
  }
};
