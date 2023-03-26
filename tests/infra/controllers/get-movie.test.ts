import { createEndToEndApp } from '@/tests/create-end-to-end-app';
import { makeMovie, mockAxios } from '@/tests/mocks';
import request from 'supertest';

describe('Get movie controller', () => {
  it('should return 200 on success get movie', async () => {
    mockAxios(makeMovie);
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).get(
      '/movie/111',
    );
    expect(status).toBe(200);
    expect(body).toEqual(makeMovie);
  });

  it('should return 400 if id is not valid', async () => {
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).get(
      '/movie/null',
    );
    expect(status).toBe(400);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 400,
    });
  });

  it('should return 404 on success create movie', async () => {
    mockAxios(null);
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).get(
      '/movie/111',
    );
    expect(status).toBe(404);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 404,
    });
  });
});
