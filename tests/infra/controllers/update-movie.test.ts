import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { makeMovie, mockAxios } from '@/tests/mocks';
import request from 'supertest';

const makeUpdateMovieRequest = () => ({
  genres: [],
  original_title: 'valid_original_language',
  production_companies: [],
  production_countries: [],
});

describe('Update movie controller', () => {
  it('should return 200 on success update movie', async () => {
    mockAxios(makeMovie);
    const { app } = await createEndToEndApp();
    const { status } = await request(app.getHttpServer())
      .put('/movie/111')
      .send(makeUpdateMovieRequest());
    expect(status).toBe(200);
  });

  it('should return 400 if payload is not valid', async () => {
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer())
      .put('/movie/null')
      .send({});
    expect(status).toBe(400);
    expect(body).toEqual({
      message: expect.any(Array),
      statusCode: 400,
    });
  });

  it('should return 404 on failed update movie', async () => {
    mockAxios(null);
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer())
      .put('/movie/111')
      .send(makeUpdateMovieRequest());
    expect(status).toBe(404);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 404,
    });
  });
});
