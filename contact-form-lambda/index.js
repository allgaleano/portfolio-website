import { Resend } from "resend";
import Response from "./emails/response";
import Submission from "./emails/submission";

const resend = new Resend(process.env.RESEND_API_KEY);

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

export const handler = async (event) => {

  try {
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }
  
    const { name, email, phone, subject, message, lang = 'en' } = body;
  
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: name, email, subject, and message are required'
        }),
      };
    }
  
    const submissionEmailResult = await resend.emails.send({
      from: 'web@albertogaleano.com',
      to: 'all.galeano.diaz@gmail.com',
      subject: `Form submission: ${subject}`,
      react: Submission({
        name,
        email,
        phone,
        subject,
        message,
      }),
    });
    
    const responseEmailResult = await resend.emails.send({
      from: 'web@albertogaleano.com',
      to: email,
      subject: lang === 'es' ? '¡Gracias por tu mensaje!' : 'Thank you for your message!',
      react: Response({
        name,
        email,
        phone,
        lang,
      }),
    });

    console.log('Submission email sent:', submissionEmailResult);
    console.log('Response email sent:', responseEmailResult);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Emails sent successfully',
        submissionId: submissionEmailResult.data?.id,
        responseId: responseEmailResult.data?.id,
      }),
    };

  } catch (error) {

    console.error('Error sending emails:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send emails',
        details: error.message,
      }),
    };
  }
};
