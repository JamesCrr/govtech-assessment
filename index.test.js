const request = require('supertest');
const { createServer } = require('./index');

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = createServer();
  });

  describe('GET /', () => {
    it('should return Hello Node!', async () => {
      const response = await request(server)
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello Node!\n');
      expect(response.headers['content-type']).toBe('text/plain');
    });
  });

  describe('GET /time', () => {
    it('should return current server time in ISO format', async () => {
      const beforeTime = new Date();

      const response = await request(server)
        .get('/time')
        .expect(200);

      const afterTime = new Date();

      expect(response.headers['content-type']).toBe('text/plain');
      expect(response.text).toMatch(/^Current server time: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\n$/);

      const timeMatch = response.text.match(/Current server time: (.+)\n/);
      expect(timeMatch).toBeTruthy();

      const returnedTime = new Date(timeMatch[1]);
      expect(returnedTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(returnedTime.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });

    it('should return valid ISO 8601 timestamp', async () => {
      const response = await request(server)
        .get('/time')
        .expect(200);

      const timeMatch = response.text.match(/Current server time: (.+)\n/);
      const timestamp = timeMatch[1];

      expect(() => new Date(timestamp)).not.toThrow();
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });
});