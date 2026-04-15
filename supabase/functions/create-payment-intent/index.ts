export const handler = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { amount } = await req.json();

  // In a real app, this would create a PaymentIntent on Stripe using the secret key
  // and return the client_secret. Here we return a mock value.
  const mockClientSecret = `mock_secret_${amount}`;

  return new Response(JSON.stringify({ client_secret: mockClientSecret }), {
    headers: { "Content-Type": "application/json" },
  });
};

export default handler;