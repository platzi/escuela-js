const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  MongoLibMock,
  getAllStub,
  createStub
} = require("../utils/mocks/mongoLib");

const {
  moviesMock,
  filteredMoviesMock
} = require("../utils/mocks/movies");

describe("services - movies", function() {
  const MoviesService = proxyquire("../services/movies", {
    "../lib/mongo": MongoLibMock
  });

  const moviesService = new MoviesService();

  describe("when getMovies method is called", async function() {
    it("should call the getAll MongoLib method", async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it("should return an array of movies", async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });

  describe("when getMovies mehtod is called with tags", async function() {
    it("should call the getAll MongoLib method with tags args", async function() {
      await moviesService.getMovies({ tags: ["Drama"] });
      const tagQuery = { tags: { $in: ["Drama"] } };
      assert.strictEqual(getAllStub.calledWith("movies", tagQuery), true);
    });

    it("should return an array of movies filtered by the tag", async function() {
      const result = await moviesService.getMovies({ tags: ["Drama"] });
      const expected = filteredMoviesMock("Drama");
      assert.deepEqual(result, expected);
    });
  });

  describe("when createMovie mehtod is called", function() {
    it("should call the create MongoLib method", async function() {
      await moviesService.createMovie({});
      assert.strictEqual(createStub.calledOnce, true);
    });

    it("should return the created movie id", async function() {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      assert.deepEqual(result, expected);
    });
  });
});
