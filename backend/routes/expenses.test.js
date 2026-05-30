import request from 'supertest';
import app from '../Server.js';

test('GET /api/expenses returns 200', async () => {
    const res = await request(app).get('/api/expenses');
    expect(res.statusCode).toBe(200);
});