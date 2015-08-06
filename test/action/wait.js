
var b3 = require('./../../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

var tickStub = require('./../fixtures/tickstub');

describe('action:Wait', function () {
  it('should have a name', function () {
    var child = {execute: sinon.stub()};
    var node = new b3.action.Wait(15);

    expect(node.name).to.be.equal('Wait');
  });

  it('should invert status from child', function(done) {
    var tick = tickStub();
    var wait = new b3.action.Wait(15);
    wait.id = 0;

    tick.blackboard.get
        .onCall(0).returns(false)
        .onCall(1).returns(true);
    tick.blackboard.get
        .withArgs('startTime', 0, 0)
        .returns((new Date()).getTime());

    var startTime = (new Date()).getTime();

    var status = wait.execute(tick);
    expect(status).to.be.equal(b3.State.RUNNING);

    setTimeout(() => {
      var status = wait.execute(tick);
      expect(status).to.be.equal(b3.State.SUCCESS);

      done();
    }, 20);
  });
});