require('dotenv').config();
const Docstron = require('../index');
const fs = require('fs');
const path = require('path');

async function generatePdfExample() {
    const apiKey = process.env.DOCSTRON_API_KEY;
    const appId = process.env.DOCSTRON_APP_ID;
    const templateId = process.env.DOCSTRON_TEMPLATE_ID;

    if (!apiKey || !appId) {
        console.error('❌ Missing credentials. Please check your .env file for DOCSTRON_API_KEY and DOCSTRON_APP_ID');
        process.exit(1);
    }

    if (templateId === 'template-your-id-here') {
        console.error('❌ Please set DOCSTRON_TEMPLATE_ID in your .env file');
        console.error('   Or replace "template-your-id-here" with your actual template ID in the code');
        process.exit(1);
    }

    const client = new Docstron(apiKey);

    try {
        console.log('🎯 Docstron SDK v' + Docstron.getVersion());
        console.log('📄 PDF Generation Examples\n');
        console.log('='.repeat(50));

        /*
        // STEP 1: Creating a template first        
        console.log('\n 📝 Step 1: Creating a template...');
        const template = await client.templates.create({
            application_id: appId,
            name: 'Invoice Template - ' + Date.now(),
            content:
                `<!DOCTYPE html>
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
                `
        });
        console.log('✅ Template created: ', template.template_id);
        */


        // STEP 2: Generate PDF with document_id response
        /*
        console.log('📄 Step 2: Generating PDF (document_id response)...');
        const doc1 = await client.documents.generate('template-940dedbf-30af-422f-8aff-7e8b05f0ad70', {
            data: {
                invoice_number: 'INV-2025-001',
                date: new Date().toLocaleDateString(),
                customer_name: 'John Doe',
                customer_email: 'john.doe@example.com',
                item_name: 'Product A',
                quantity: 2,
                price: '$50',
                total: '$100'
            },
            response_type: 'document_id'
        });
        console.log('✅ PDF generated!');
        console.log('  Document ID: ', doc1.document_id);
        console.log('  Document URL: ', doc1.download_url);
        */

        /*
        console.log('📄 Step 2: Generating PDF (document_id response)...');
        const doc1 = await client.documents.generate('template-5f7ef2fd-3d83-47f8-9fc9-e6820ad52adb', {
            data: {
                invoice_number: 'INV-2025-001',
                invoice_date: new Date().toLocaleDateString(),
                customer_name: 'Acme Corporation',
                customer_email: 'billing@acme.com',
                customer_address: '123 Business St, New York, NY 10001',
                item_description: 'Web Development Services',
                item_quantity: '40 hours',
                item_rate: '$100/hour',
                item_amount: '$4,000.00',
                subtotal: '$4,000.00',
                tax_rate: '10',
                tax_amount: '$400.00',
                total_amount: '$4,400.00',
                notes: 'Payment due within 30 days',
                company_name: 'Your Company Inc.',
                company_address: '456 Company Ave, San Francisco, CA 94102',
                company_email: 'info@yourcompany.com',
                company_phone: '+1 (555) 123-4567'
            },
            response_type: 'document_id'
        });
        console.log('✅ PDF generated!');
        console.log('  Document ID: ', doc1.document_id);
        console.log('  Document URL: ', doc1.download_url);
        */

        /*
        // Step 3: Generate PDF with base64 response
        console.log('\n📄 Step 3: Generating PDF (base64 response)...');
        const doc2 = await client.documents.generate(template.template_id, {
            data: {
                invoice_number: 'INV-2025-002',
                date: new Date().toLocaleDateString(),
                customer_name: 'Jane Smith',
                customer_email: 'jane@example.com',
                item_name: 'Consulting Services',
                quantity: '20 hours',
                price: '$150/hr',
                total: '$3,000.00'
            },
            response_type: 'json_with_base64'
        });
        console.log('✅ PDF generated!');
        console.log('   Document ID:', doc2.document_id);
        console.log('   Filename:', doc2.filename);
        console.log('   Size:', doc2.size_bytes, 'bytes');
        console.log('   Base64 length:', doc2.pdf_content.length, 'characters');
        */

        // Step 4: Download the PDF

        console.log('\n 📥 Step 4: Downloading PDF...');
        const outputPath = path.join(__dirname, '../output', `invoice-${'document-004e98bf-76a7-4548-934e-d95912f7ead9'}.pdf`);

        // Create output directory if it doesn't exist
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const pdfBuffer = await client.documents.download('document-004e98bf-76a7-4548-934e-d95912f7ead9', outputPath);
        console.log('✅ PDF downloaded!');
        console.log('   Saved to:', outputPath);
        console.log('   Size:', pdfBuffer.length, 'bytes');


        // Step 5: Get document details
        /*
        console.log('\n📖 Step 5: Getting document details...');
        const docDetails = await client.documents.get(doc1.document_id);
        console.log('✅ Document details retrieved!');
        console.log('   Template ID:', docDetails.template_id);
        console.log('   Created:', docDetails.created_at);
        */

        // Step 6: List all documents
        /*
        console.log('\n📋 Step 6: Listing all documents...');
        const allDocs = await client.documents.list();
        console.log('✅ Found', allDocs.length, 'documents');
        */

        // Clean up
        /*
        console.log('\n🧹 Cleaning up...');
        await client.documents.delete(doc1.document_id);
        await client.documents.delete(doc2.document_id);
        await client.templates.delete(template.template_id);
        console.log('✅ Test data cleaned up');
        */

        // Example 1: Simple PDF generation with document_id response
        /*
        console.log('📝 Example 1: Generate PDF (get download URL)...\n');
        const invoice1 = await client.documents.generate(templateId, {
            data: {
                invoice_number: 'INV-2025-001',
                invoice_date: new Date().toLocaleDateString(),
                customer_name: 'Acme Corporation',
                customer_email: 'billing@acme.com',
                customer_address: '123 Business St, New York, NY 10001',
                item_description: 'Web Development Services',
                item_quantity: '40 hours',
                item_rate: '$100/hour',
                item_amount: '$4,000.00',
                subtotal: '$4,000.00',
                tax_rate: '10',
                tax_amount: '$400.00',
                total_amount: '$4,400.00',
                notes: 'Payment due within 30 days',
                company_name: 'Your Company Inc.',
                company_address: '456 Company Ave, San Francisco, CA 94102',
                company_email: 'info@yourcompany.com',
                company_phone: '+1 (555) 123-4567'
            },
            response_type: 'document_id'
        });
        console.log('✅ PDF Generated!');
        const outputPath2 = path.join(__dirname, '../output', `invoice-${invoice1.document_id}.pdf`);
        const pdfBuffer2 = await client.documents.download(invoice1.document_id, outputPath2);
        console.log('✅ PDF downloaded!');
        console.log('   Saved to:', outputPath2);
        console.log('   Size:', pdfBuffer2.length, 'bytes');
        */

        console.log('\n' + '='.repeat(50));
        console.log('🎉 All PDF generation examples completed successfully!\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.statusCode) {
            console.error('Status Code:', error.statusCode);
        }
    }
}

generatePdfExample();