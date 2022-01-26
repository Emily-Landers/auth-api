'use strict';

const errorHandler = require('../lib/error-handlers/500.js');

describe('testing the server error handler', () => {
  it('should send a 500 response when called', () => {

    let request = {};
    let response = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
      send: jest.fn(() => response),
    };
    let error = {
      message: 'Test Error',
    };
    let next = jest.fn();

    errorHandler(error, request, response, next);
    expect(response.status).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({status: 500, message: error.message});
  });
});