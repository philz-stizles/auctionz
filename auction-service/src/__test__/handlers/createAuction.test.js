const { handler, uuidv4 } = require('./../../handlers/createAuction');

describe('createAuction handler', () => {
  test('correctly create auction', () => {
    const event = {
      title: 'Test Auction',
      requestContext: { authorizer: { email: 'someemail@test.test' } },
    };
    expect(handler.createAuction(event)).toStrictEqual({
      statusCode: 201,
      body: JSON.stringify(newAuction),
    });
  });
});
