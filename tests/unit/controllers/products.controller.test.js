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
  mockPost,
  mockPut,
} = require('../mocks/mockProducts');

const  productsService = require('../../../src/services/products.service');
const { getByAll, getById, postName, putId, deleteId } = require('../../../src/controllers/products.controller');

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

  it('Criando o produto pelo id', async function () {
    const res = {};
    const req = {
      name: 'Product X'
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'postItem')
      .resolves({ type: 201, message: mockPost });

    await postName(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockPost);
  });

  it('Alterando o produto pelo id', async function () {
    const res = {};
    const req = {
      name: 'martelin'
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'putProductUpdate')
      .resolves({ type: 200, message: mockPut });

    await putId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockPut);
  });

  it('Deletando o produto pelo id', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deletProduct')
      .resolves({ type: 204 });

    await deleteId(req, res);

    expect(res.status).to.have.been.calledWith(204);
    
  });
});