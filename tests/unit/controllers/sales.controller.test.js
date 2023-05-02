const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const {
  mockAll,
  mockId,
} = require('../mocks/mockSales');

const salesService = require('../../../src/services/sales.service');
const { getByAll, getById, postSalesItem } = require('../../../src/controllers/sales.controller');

describe('test de pesquisa de sales', function () {
  this.afterEach(() => sinon.restore());
  it('Pegando todos os sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales')
      .resolves({ type: null, message: mockAll });

    await getByAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAll);
  });

  it('Pegando o sales pelo id', async function () {
    const res = {};
    const req = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesId')
      .resolves({ type: 200, message: mockId });

    await getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockId);
  });
});