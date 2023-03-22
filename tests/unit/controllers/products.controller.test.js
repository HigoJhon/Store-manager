const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const {
  mockGetAll,
  mockId,
} = require('../mocks/mockProducts');

const  productsService = require('../../../src/services/products.service');
const { getByAll, getById } = require('../../../src/controllers/products.controller');

describe('test de pesquisa de produtos', function () {
  this.afterEach(() => sinon.restore());
  it('Pegando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: mockGetAll });
    
    await getByAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockGetAll);
  });

  it('Pegando o produto pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 3 },
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductId')
      .resolves({ type: 200, message: mockId });
    
    await getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockId);
  });
});