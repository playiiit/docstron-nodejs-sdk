require('dotenv').config();
const Docstron = require('../index');

async function createInvoiceTemplate() {
  const apiKey = process.env.DOCSTRON_API_KEY;
  const appId = process.env.DOCSTRON_APP_ID;

  if (!apiKey || !appId) {
    console.error('❌ Missing credentials. Please check your .env file.');
    process.exit(1);
  }

  const client = new Docstron(apiKey);

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #4a90e2;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #4a90e2;
            margin: 0;
          }
          .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .info-box {
            flex: 1;
          }
          .info-box h3 {
            color: #4a90e2;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            background: #4a90e2;
            color: white;
            padding: 12px;
            text-align: left;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          .total-section {
            text-align: right;
            margin-top: 20px;
          }
          .total {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <p>Invoice #{{invoice_number}}</p>
          <p>Date: {{invoice_date}}</p>
        </div>

        <div class="info-section">
          <div class="info-box">
            <h3>From:</h3>
            <p><strong>{{company_name}}</strong></p>
            <p>{{company_address}}</p>
            <p>{{company_email}}</p>
          </div>
          <div class="info-box">
            <h3>Bill To:</h3>
            <p><strong>{{customer_name}}</strong></p>
            <p>{{customer_address}}</p>
            <p>{{customer_email}}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{item_description}}</td>
              <td>{{item_quantity}}</td>
              <td>{{item_rate}}</td>
              <td>{{item_amount}}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <p><strong>Subtotal:</strong> {{subtotal}}</p>
          <p><strong>Tax ({{tax_rate}}%):</strong> {{tax_amount}}</p>
          <p class="total">Total: {{total_amount}}</p>
        </div>

        <div class="footer">
          <p>{{footer_text}}</p>
          <p>Payment due within 30 days</p>
        </div>
      </body>
    </html>
  `;

  try {
    const template = await client.templates.create({
      application_id: appId,
      name: 'Professional Invoice Template - ' + Date.now(),
      content: invoiceHTML,
      is_active: true,
      extra_css: `
            @page{
                margin: 2cm;
                @bottom-center {
                    content: "Page " counter(page) " of " counter(pages);
                    font-size: 10px;
                    color: #666;
                }
            }
        `
    });
    console.log('✅ Invoice template created!');
    console.log('Template ID:', template.template_id);
    console.log('\nYou can now use this template to generate invoices with your data.');
    console.log('\nExample data structure:');
    console.log(JSON.stringify({
      invoice_number: 'INV-2025-001',
      invoice_date: '2025-11-08',
      company_name: 'Acme Corporation',
      company_address: '123 Business St, City, State 12345',
      company_email: 'billing@acme.com',
      customer_name: 'John Doe',
      customer_address: '456 Customer Ave, City, State 67890',
      customer_email: 'john@example.com',
      item_description: 'Web Development Services',
      item_quantity: '40 hours',
      item_rate: '$100/hr',
      item_amount: '$4,000.00',
      subtotal: '$4,000.00',
      tax_rate: '10',
      tax_amount: '$400.00',
      total_amount: '$4,400.00',
      footer_text: 'Thank you for your business!'
    }, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

}

createInvoiceTemplate();