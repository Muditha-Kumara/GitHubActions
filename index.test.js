import { handler } from './index.js';

test('handler returns correct interest rates', async () => {
  const expectedInterestRates = {
    Personal: 3.5,
    Auto: 10.1,
    Mortgage: 15.5,
    Student: 5.6,
    Business: 18.5
  };

  const result = await handler();
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(200);
  expect(body).toEqual(expectedInterestRates);
});