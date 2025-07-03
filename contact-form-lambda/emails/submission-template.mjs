export function generateSubmissionEmail({ name, email, phone, subject, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form submission from ${name}</title>
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
    .field {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.5;
      margin: 16px 0;
    }
    strong {
      font-weight: 600;
      color: #1f2937;
    }
    .message-text {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Form submission from <strong>${name}</strong></h1>
    <div class="field">
      <strong>Email:</strong> ${email}
    </div>
    ${phone ? `
    <div class="field">
      <strong>Phone:</strong> ${phone}
    </div>
    ` : ''}
    <div class="field">
      <strong>Subject:</strong> ${subject}
    </div>
    <div class="field">
      <strong>Message:</strong>
      <div class="message-text">${escapeHtml(message)}</div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}