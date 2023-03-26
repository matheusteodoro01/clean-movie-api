import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import request from 'supertest';

const makeCreateMovieRequest = () => ({
  adult: false,
  genres: [],
  homepage: 'valid_homepage',
  original_language: 'valid_original_language',
  original_title: 'valid_original_language',
  overview: 'valid_overview',
  popularity: 0,
  poster_path: 'valid_poster_path',
  production_companies: [],
  production_countries: [],
  release_date: 'valid_release_date',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: 'valid_status',
  title: 'valid_title',
});

describe('Create movie controller', () => {
  it('should return 201 on success create movie', async () => {
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer())
      .post('/movie')
      .send(makeCreateMovieRequest());
    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(Number),
      ...makeCreateMovieRequest(),
    });
  });

  it('should return 400 if payload is not valid', async () => {
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer())
      .post('/movie')
      .send({});
    expect(status).toBe(400);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 400,
    });
  });
});
