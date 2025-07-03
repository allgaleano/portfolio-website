import { handler } from './index.mjs';

const testEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    name: 'Duda sobre web',
    email: 'all.galeano.diaz@gmail.com',
    phone: '+1234567890',
    subject: 'Consulta sobre el sitio web',
    message: 'Hola, tengo una duda sobre el sitio web y me gustaría recibir más información.',
    lang: 'es'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
};

// Test the handler
console.log('Testing email handler...');
try {
  const response = await handler(testEvent);
  console.log('Response:', JSON.stringify(response, null, 2));
} catch (error) {
  console.error('Error:', error);
}