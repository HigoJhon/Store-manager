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

const productsConnection = require('../../../src/models/connection');

const { getAllProducts, getProductId } = require('../../../src/models/products.model')

describe('test Models', function () {
  afterEach(() => sinon.restore());
  it('Pegando todos os produtos', async function () {

    sinon.stub(productsConnection, 'execute')
      .resolves(mockGetAll);

    await getAllProducts();
  });
  it('Pegando apenas o produto pelo id', async function () {

    sinon.stub(productsConnection, 'execute')
      .resolves([[mockId]]);

    await getProductId(1);
  });
});