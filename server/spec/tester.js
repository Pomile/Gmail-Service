import request from 'supertest';
import chai from 'chai';
import app from '../index';

const { expect } = chai;

describe('TEST SUITE', () => {
  describe('GET /test', () => {
    it('should test route', (done) => {
      request(app)
        .get('/api/v1/test')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('Route module is working perfectly');
          done();
        });
    });
  });
});
