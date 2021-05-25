const Todos = require('./gateway');
const assert = require('assert').strict;

describe("unit test", function() {

  it("validate example urls", function() {
    let gateway = new Gateway();
    assert.strictEqual(gateway.haveMethod("api.bots.business/bots/4454?ddddff"), true);
  });

});