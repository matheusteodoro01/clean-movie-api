import axios from 'axios';

export const mockAxios = (data?: any) => {
  jest.mock('axios');
  axios.create = jest.fn().mockReturnThis();

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url.includes('/movie')) {
      return Promise.resolve({ data });
    }
    return Promise.resolve({ data });
  });
};
