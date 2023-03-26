import request from 'supertest';
import { makeMovie, mockAxios } from '@/tests/mocks';
import { createEndToEndApp } from '@/tests/create-end-to-end-app';

describe('Delete movie controller', () => {
  it('should return 200 on delete delete movie', async () => {
    mockAxios(makeMovie);
    const { app } = await createEndToEndApp();
    const { status } = await request(app.getHttpServer()).delete('/movie/111');
    expect(status).toBe(200);
  });

  it('should return 400 if id is not valid', async () => {
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).delete(
      '/movie/null',
    );
    expect(status).toBe(400);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 400,
    });
  });

  it('should return 404 on success delete movie', async () => {
    mockAxios(null);
    const { app } = await createEndToEndApp();
    const { status, body } = await request(app.getHttpServer()).delete(
      '/movie/111',
    );
    expect(status).toBe(404);
    expect(body).toEqual({
      message: expect.any(String),
      statusCode: 404,
    });
  });
});
