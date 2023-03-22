const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { mockGetAll, mockId } = require('../mocks/mockProducts');

const prodiuctsModel = require('../../../src/models/products.model');
const { getAllProducts, getProductId } = require('../../../src/services/products.service');

describe('test service', function () {
  afterEach(() => sinon.restore());
  it('Pegando todos os produtos', async function () {

    sinon.stub(prodiuctsModel, 'getAllProducts')
      .resolves(mockGetAll);

    await getAllProducts();
  });
  it('Pegando apenas o produto pelo id', async function () {

    const req = {
      params: { id: 3 },
    }

    sinon.stub(prodiuctsModel, 'getProductId')
      .resolves(mockId);

    await getProductId(req);
  });
});
