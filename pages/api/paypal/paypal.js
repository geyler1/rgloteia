import paypal from "@paypal/checkout-server-sdk";
// Creating an environment
let clientId = "ASWJk22tmRjWdt5StYJ_q7OrHEjd6Gtx1K7rV4TWCqP9rsKITSQy9V2HxGtH01pKwVy8cA7iAp1dDMf3";
let clientSecret = "EEhDDEplYOejK_d336W1NdmvVHYUfui6OgiZiDt7TJnaX9iAWYjdcW_6YYDzDdeq-KQWngnnbeWVUSDb";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {

  const {saldo} = req.body;
  const {fichas} = req.body;
  console.log(req.body)
  console.log('precio y monedas '+saldo+' '+fichas)

  if (req.method === "POST") {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    });
    const response = await client.execute(request);
    return res.json({ id: response.result.id});
  }
}