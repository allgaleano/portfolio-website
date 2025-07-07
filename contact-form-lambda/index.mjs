import { Resend } from "resend";
import { generateResponseEmail } from "./emails/response-template.mjs";
import { generateSubmissionEmail } from "./emails/submission-template.mjs";

const resend = new Resend(process.env.RESEND_API_KEY);
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const HCAPTCHA_VERIFY_URL = 'https://api.hcaptcha.com/siteverify';


// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const verifyHCaptcha = async (token) => {
  try {
    const response = await fetch(HCAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${HCAPTCHA_SECRET}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
};

export const handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: '',
    };
  }

  try {
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }
  
    const { name, email, phone, subject, message, lang = 'en', captchaToken } = body;
  
    // Validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: name, email, subject, and message are required'
        }),
      };
    }

    if (!validateEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid email format'
        }),
      };
    }

    if (!captchaToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing captcha token'
        }),
      };
    }

    const captchaValid = await verifyHCaptcha(captchaToken);

    if (!captchaValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid captcha verification'
        }),
      };
    }

    // Generate HTML emails
    const submissionHtml = generateSubmissionEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    const responseHtml = generateResponseEmail({
      name,
      email,
      phone,
      lang,
    });
  
    // Send emails in parallel
    const [submissionEmailResult, responseEmailResult] = await Promise.all([
      resend.emails.send({
        from: 'CV WEB <web@albertogaleano.com>',
        to: 'all.galeano.diaz@gmail.com',
        subject: `Form submission: ${subject}`,
        html: submissionHtml,
      }),
      resend.emails.send({
        from: 'Alberto Galeano <web@albertogaleano.com>',
        to: email,
        subject: lang === 'es' ? '¡Gracias por tu mensaje!' : 'Thank you for your message!',
        html: responseHtml,
      })
    ]);

    console.log('Submission email sent:', submissionEmailResult);
    console.log('Response email sent:', responseEmailResult);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Emails sent successfully',
        submissionId: submissionEmailResult.data?.id,
        responseId: responseEmailResult.data?.id,
      }),
    };

  } catch (error) {
    console.error('Error sending emails:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to send emails' 
      : error.message;
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send emails',
        details: errorMessage,
      }),
    };
  }
};