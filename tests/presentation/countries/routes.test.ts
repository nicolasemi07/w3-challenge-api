import { prisma } from '../../../src/data/postgres';
import { testServer } from './../../test-server';
import request from 'supertest';

describe('Countries route testing', () => {

  beforeAll(async () => {
    await testServer.start();
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Hide console.log in tests
  });

  afterAll(() => {
    testServer.close();
    (console.log as jest.Mock).mockRestore();
  });

  test('should return a 204 status code when fetching countries without query param', async () => {
    const response = await request(testServer.app)
      .get('/api/countries');
    expect(response.statusCode).toBe(204);
  });

  test('should return a 204 status code when fetching countries with query param beeing short-lengthed', async () => {
    const response = await request(testServer.app)
      .get('/api/countries?value=di');
    expect(response.statusCode).toBe(204);
  });

  test('should return a 204 status code when fetching countries with query param beeing []', async () => {
    const response = await request(testServer.app)
      .get('/api/countries?value=[]');
    expect(response.statusCode).toBe(204);
  });

  test('should return a 204 status code when fetching countries with query param beeing {}', async () => {
    const response = await request(testServer.app)
      .get('/api/countries?value={}');
    expect(response.statusCode).toBe(204);
  });

  test('should return a 200 status code when fetching countries with query param beeing *nia*', async () => {
    await prisma.country.deleteMany();
    await prisma.country.createMany({
      data: [
        { id: 3, name: 'Jordania', populationNumber: 682320000 },
        { id: 4, name: 'Albania', populationNumber: 98232000 },
      ]
    });
    const response = await request(testServer.app)
      .get('/api/countries?value=nia');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual([
      { name: 'Jordania', percentageOfPopulation: 87, populationNumber: 682320000 },
      { name: 'Albania', percentageOfPopulation: 13, populationNumber: 98232000 },
    ]);

  });

});
