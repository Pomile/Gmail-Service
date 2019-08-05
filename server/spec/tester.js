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
    it('should generate google OAuth URL', (done) => {
      request(app)
        .get('/api/v1/oauth/url')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('url');
          done();
        });
    });
    it('should not generate new token without authorization code', (done) => {
      request(app)
        .get('/api/v1/oauth2callback')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.msg).to.equal('authorization code is not defined');
          done();
        });
    });
    it('should not generate new token with invalid authorization code', (done) => {
      request(app)
        .get('/api/v1/oauth2callback?code=1/hjghgsgsrstyrwtywrtfnb')
        .set('Accept', 'application/json')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.msg).to.equal('invalid_grant');
          done();
        });
    });
    it('should send a mail with gmail client', (done) => {
      request(app)
        .post('/api/v1/gmail/send')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.sent).to.equal(true);
          done();
        });
    });
    it('should send a mail with nodemailer client', (done) => {
      request(app)
        .post('/api/v1/nodemailer/send')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.sent).to.equal(true);
          done();
        });
    });
  }, 2000);
});
