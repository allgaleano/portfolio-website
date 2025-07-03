const text = {
  en: {
    preview: "Your email has reached my inbox! I will get back to you as soon as possible.",
    title: "Thank you for your message",
    body: "Your message has been received successfully and I will get back to you soon at this email: ",
    phoneAlternative: "or at this phone number: "
  },
  es: {
    preview: "¡Tu email ha llegado correctamente! Me pondré en contacto contigo lo antes posible.",
    title: "¡Gracias por tu mensaje",
    body: "Tu mensaje ha sido recibido correctamente y pronto me pondré en contacto contigo a través de este email: ",
    phoneAlternative: "o a través de este número de teléfono: "
  }
};

export function generateResponseEmail({ name, email, phone, lang = "en" }) {
  const t = text[lang];
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.preview}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
      background-color: #f9fafb;
    }
    .container {
      max-width: 450px;
      margin: 40px auto;
      background-color: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      padding: 24px;
    }
    h1 {
      margin: 30px 0;
      padding: 0;
      text-align: center;
      font-weight: normal;
      font-size: 22px;
      color: #000000;
    }
    .text {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.5;
      margin: 16px 0;
    }
    strong {
      font-weight: 600;
      color: #1f2937;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${t.title} <strong>${name}</strong>!</h1>
    <p class="text">
      ${t.body} <strong>${email}</strong>${phone ? ` ${t.phoneAlternative} <strong>${phone}</strong>.` : '.'}
    </p>
  </div>
</body>
</html>
  `.trim();
}