const request = require('supertest');
const app = require('../src/app');

describe('Order API Test', () => {

  it('should return 401 when no token provided', async () => {
    const res = await request(app)
      .post('/api/orders/createOrder')
      .send({
        items: [{ productId: "123", quantity: 2 }]
      });

    expect(res.statusCode).toBe(401);
  });

});