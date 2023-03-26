import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { makeMovie, mockAxios } from '@/tests/mocks';
import request from 'supertest';

describe('List movies controller', () => {
  it('should return 200 on success list movies', async () => {
    mockAxios({ results: [makeMovie] });
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).get('/movie');
    expect(status).toBe(200);
    expect(body).toEqual({ page: 1, results: [makeMovie] });
  });
});
