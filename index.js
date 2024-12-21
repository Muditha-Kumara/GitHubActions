export const handler = async (event) => {
  const interestRates = {
    Personal: 3.5,
    Auto: 10.1,
    Mortgage: 15.5,
    Student: 5.6,
    Business: 18.5
  };

  return {
    statusCode: 200,
    body: JSON.stringify(interestRates),
  };
};

// To run the handler function for testing purposes
if (typeof jest === 'undefined'){// && import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const result = await handler();
    console.log(result);
  })();
}