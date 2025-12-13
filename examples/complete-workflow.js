require('dotenv').config();
const Docstron = require('../index');
const path = require('path');
const fs = require('fs');

/**
 * Complete workflow: Application → Template → Document
 * This demonstrates the full Docstron workflow from start to finish
 */

async function completeWorkflow() {
    const apiKey = process.env.DOCSTRON_API_KEY;

    if (!apiKey) {
        console.error('❌ Missing DOCSTRON_API_KEY');
        process.exit(1);
    }

    const client = new Docstron(apiKey);

    console.log('🚀 Complete Docstron Workflow\n');
    console.log('='.repeat(50));
    console.log('SDK Version:', Docstron.getVersion());
    console.log('Features:', JSON.stringify(Docstron.getFeatures(), null, 2));
    console.log('');

    try {
        /*
        // Step 1: Create Application
        console.log('Step 1: Creating application...\n');
        const app = await client.applications.create({
            name: 'Invoice System - ' + Date.now(),
            description: 'Complete workflow demo application',
            is_active: true
        });
        console.log('✅ Application created!');
        console.log('   App ID:', app.app_id);
        console.log('');
        */

        /*
        // Step 2: Create Template
        console.log('Step 2: Creating template...\n');
        const template = await client.templates.create({
            application_id: 'app-c673a1f1-ff8e-4367-98c2-063e57061a55', //app.app_id, //app-c673a1f1-ff8e-4367-98c2-063e57061a55
            name: 'Professional Invoice',
            content: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 40px; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .details { margin: 30px 0; }
              .total { font-size: 24px; font-weight: bold; color: #e74c3c; text-align: right; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>INVOICE</h1>
              <p>Invoice #{{invoice_number}}</p>
            </div>
            <div class="details">
              <p><strong>Customer:</strong> {{customer_name}}</p>
              <p><strong>Date:</strong> {{date}}</p>
              <p><strong>Service:</strong> {{service}}</p>
            </div>
            <p class="total">Total: {{total}}</p>
          </body>
        </html>
      `,
            is_active: true
        });
        console.log('✅ Template created!');
        console.log('   Template ID:', template.template_id);
        console.log('');
        */

        /*
        // Step 3: Generate Document
        console.log('Step 3: Generating PDF...\n');
        const doc = await client.documents.generate(template.template_id, {
            data: {
                invoice_number: 'INV-DEMO-001',
                customer_name: 'Demo Client',
                date: new Date().toLocaleDateString(),
                service: 'SDK Demo Services',
                total: '$999.00'
            },
            response_type: 'document_id'
        });
        console.log('✅ PDF generated!');
        console.log('   Document ID:', doc.document_id);
        console.log('   Download URL:', doc.download_url);
        console.log('');
        */

        /*
        // Step 4: Download PDF
        console.log('Step 4: Downloading PDF...\n');
        const outputDir = path.join(__dirname, '../output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path.join(outputDir, 'complete-workflow-demo.pdf');
        await client.documents.download(doc.document_id, outputPath); //document-815b139b-12dd-46de-ab42-0e832bf6f7b0
        console.log('✅ PDF downloaded!');
        console.log('   Saved to:', outputPath);
        console.log('');
        */

        /*
        // Step 5: Get Statistics
        console.log('Step 5: Getting statistics...\n');
        const appDetails = await client.applications.get(app.app_id);
        const templates = await client.templates.list(app.templateId);
        const documents = await client.documents.list(app.documentId);

        console.log('✅ Statistics:');
        console.log(`   Application: ${appDetails.name}`);
        console.log(`   Templates created: ${templates.length}`);
        console.log(`   Total documents: ${documents.length}`);
        console.log('');
        */

        /*
        // Step 6: Cleanup
        console.log('Step 6: Cleaning up...\n');
        await client.documents.delete(doc.document_id);
        console.log('✅ Document deleted');
        await client.templates.delete(template.template_id);
        console.log('✅ Template deleted');
        await client.applications.delete(app.app_id);
        console.log('✅ Application deleted');
        console.log('');
        */

        console.log('='.repeat(50));
        console.log('🎉 Complete workflow finished successfully!\n');
        console.log('Summary:');
        console.log('  ✅ Created application');
        console.log('  ✅ Created template');
        console.log('  ✅ Generated PDF');
        console.log('  ✅ Downloaded PDF');
        console.log('  ✅ Cleaned up resources');
        console.log('');
        console.log(`PDF saved at: ${outputPath}`);
        console.log('');
        
        

    } catch (error) {
        console.error('\n❌ Workflow failed:', error.message);
        if (error.statusCode) {
            console.error('Status Code:', error.statusCode);
        }
    }
}

completeWorkflow();