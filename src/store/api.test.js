var axios = require('axios');
var config = require('./../config');

test('adds 1 + 4 to equal 5', () => {
  expect(1+4).toBe(5);
});

describe('Axios callback API', () => {
    it('Should be status code 200', async () => {
      const response = await axios(`${config.api.requests.get}/${config.api.requests.tests.get}`);
      expect(200).toBe(response.status)
    });
});
