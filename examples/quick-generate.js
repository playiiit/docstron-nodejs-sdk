require('dotenv').config();
const Docstron = require('../index');
const fs = require('fs');
const path = require('path');

async function quickGenerateExample() {
    const apiKey = process.env.DOCSTRON_API_KEY;
    const appId = process.env.DOCSTRON_APP_ID;

    if (!apiKey) {
        console.error('❌ Missing DOCSTRON_API_KEY. Please check your .env file.');
        process.exit(1);
    }

    const client = new Docstron(apiKey);

    try {
        console.log('⚡ Quick Generate PDF Examples\n');
        console.log('='.repeat(50));

        // Example 1: Quick generate without saving template
        console.log('\n📄 Example 1: Quick generate (no template save)...');
        const doc1 = await client.documents.quickGenerate({
            html: `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 40px; }
              h1 { color: #3498db; }
            </style>
          </head>
          <body>
            <h1>Hello {{name}}!</h1>
            <p>This is a quick PDF generated on {{date}}</p>
            <p>Message: {{message}}</p>
          </body>
        </html>
      `,
            data: {
                name: 'World',
                date: new Date().toLocaleDateString(),
                message: 'No template needed!'
            },
            response_type: 'document_id'
        });
        console.log('✅ PDF generated!');
        console.log('   Document ID:', doc1.document_id);
        console.log('   Download URL:', doc1.download_url);

        /*
        // Example 2: Quick generate with extra CSS
        console.log('\n📄 Example 2: Quick generate with custom CSS...');
        const doc2 = await client.documents.quickGenerate({
            html: '<h1>Styled PDF</h1><p>This has custom page margins</p>',
            data: {},
            extra_css: '@page { margin: 3cm; } h1 { color: #e74c3c; }',
            response_type: 'document_id'
        });
        console.log('✅ PDF generated with custom styling!');
        console.log('   Document ID:', doc2.document_id);

        // Example 3: Quick generate and save as template
        if (appId) {
            console.log('\n📄 Example 3: Quick generate and save as template...');
            const doc3 = await client.documents.quickGenerate({
                html: '<h1>Receipt</h1><p>Amount: {{amount}}</p>',
                data: { amount: '$99.99' },
                response_type: 'document_id',
                save_template: true,
                application_id: appId
            });
            console.log('✅ PDF generated and template saved!');
            console.log('   Document ID:', doc3.document_id);
            console.log('   Template ID:', doc3.template_id);
        }

        // Example 4: Quick generate with password protection
        console.log('\n📄 Example 4: Password-protected PDF...');
        const doc4 = await client.documents.quickGenerate({
            html: '<h1>Confidential</h1><p>This PDF is password protected</p>',
            data: {},
            response_type: 'document_id',
            password: 'SecurePass123!'
        });
        console.log('✅ Password-protected PDF generated!');
        console.log('   Document ID:', doc4.document_id);
        console.log('   Password: SecurePass123!');
        */

        console.log('\n' + '='.repeat(50));
        console.log('🎉 Quick generate examples completed!\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.statusCode) {
            console.error('Status Code:', error.statusCode);
        }
    }
}

quickGenerateExample();