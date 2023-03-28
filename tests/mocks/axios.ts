import axios from 'axios';

export const mockAxios = (data?: any, status?: number) => {
  jest.mock('axios');
  axios.create = jest.fn().mockReturnThis();

  status = status ?? 200;

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url.includes('/movie')) {
      if (status !== 200) {
        return Promise.reject({ response: { status } });
      }
      return Promise.resolve({ data, status });
    }
    return Promise.resolve({ data });
  });
};
