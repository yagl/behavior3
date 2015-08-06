
var b3 = require('./../../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

var tickStub = require('./../fixtures/tickstub');

describe('decorator:Inverter', function () {
  it('should have a name', function () {
    var child = {execute: sinon.stub()};
    var node = new b3.decorator.Inverter(child);

    expect(node.name).to.be.equal('Inverter');
  });

  it('should invert status from child', function() {
    var tick = tickStub();
    var child = {execute: sinon.stub()};
    var node = new b3.decorator.Inverter(child);
    var status = 0;
    
    child.execute.returns(b3.State.SUCCESS);
    status = node.execute(tick);
    expect(status).to.be.equal(b3.State.FAILURE);

    child.execute.returns(b3.State.FAILURE);
    status = node.execute(tick);
    expect(status).to.be.equal(b3.State.SUCCESS);
  });

  it('propagate RUNNING status from child', function() {
    var tick = tickStub();
    var child = {execute: sinon.stub()};
    var node = new b3.decorator.Inverter(child);
    var status = 0;
    
    child.execute.returns(b3.State.RUNNING);
    status = node.execute(tick);
    expect(status).to.be.equal(b3.State.RUNNING);
  });
});