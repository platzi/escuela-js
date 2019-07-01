const assert = require("assert");
const buildMessage = require("../utils/buildMessage");

describe("utils - buildMessage", function() {
  describe("when receives an entity and an action", function() {
    it("should return the respective message", function() {
      const result = buildMessage("movie", "create");
      const expect = "movie created";
      assert.strictEqual(result, expect);
    });
  });

  describe("when receives an entity and an action and is list", function() {
    it("should return the respective message with the entity in plural", function() {
      const result = buildMessage("movie", "list");
      const expect = "movies listed";
      assert.strictEqual(result, expect);
    });
  });

  describe("when receives an entity, an action and options", function() {
    it("should return the respective message including the options", function() {
      const result = buildMessage("movie", "list", { tags: ["green"] });
      const expect = "movies listed with tags: green";
      assert.strictEqual(result, expect);
    });
  });
});
