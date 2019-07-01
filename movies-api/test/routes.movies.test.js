const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with content type json', function(done) {
      request.get('/api/movies').expect('Content-type', /json/, done);
    });

    it('should respond with not error', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    it('should respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });
  });

  describe('POST /movies', function() {
    it('should respond with status 201', function(done) {
      request
        .post('/api/movies')
        .send(moviesMock[0])
        .expect(201, done);
    });

    it('should respond with content type json', function(done) {
      request
        .post('/api/movies')
        .send(moviesMock[0])
        .expect('Content-type', /json/, done);
    });

    it('should respond with not error', function(done) {
      request
        .post('/api/movies')
        .send(moviesMock[0])
        .end((err) => {
          assert.strictEqual(err, null);
          done();
        });
    });

    it('should respond with movie created id', function(done) {
      request
        .post('/api/movies')
        .send(moviesMock[0])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie created'
          });
          done();
        });
    });
  });
});
