require('dotenv').config();
const Docstron = require('../index');

async function basicExample() {
    const apiKey = process.env.DOCSTRON_API_KEY;
    const appId = process.env.DOCSTRON_APP_ID;

    // Validate credentials
    if (!apiKey) {
        console.error('❌ Error: DOCSTRON_API_KEY not found!');
        console.error('\n💡 Please create a .env file with:');
        console.error('   DOCSTRON_API_KEY=your-api-key-here');
        console.error('   DOCSTRON_APP_ID=app-your-application-id-here\n');
        process.exit(1);
    }

    if (!appId) {
        console.error('❌ Error: DOCSTRON_APP_ID not found!');
        console.error('\n💡 Please add to your .env file:');
        console.error('   DOCSTRON_APP_ID=app-your-application-id-here\n');
        process.exit(1);
    }

    const client = new Docstron(apiKey);

    try {
        console.log('Docstron SDK v' + Docstron.getVersion());
        console.log('API Key:', apiKey.substring(0, 10) + '...');
        console.log('App ID:', appId);
        console.log('Creating a template...\n');

        // Create a simple template
        const template = await client.templates.create({
            application_id: appId,
            name: 'My First Template - ' + Date.now(),
            content: '<h1>Hello {{name}}!</h1><p>Welcome to {{company}}</p>',
            is_active: true
        });

        console.log('✅ Template created successfully!');
        console.log('Template ID:', template.template_id);
        console.log('Template Name:', template.name);
        console.log('Created At:', template.created_at);
        console.log('\n');

        // Get the template
        console.log('Retrieving the template...');
        const retrieved = await client.templates.get(template.template_id);
        console.log('✅ Template retrieved:', retrieved.name);
        console.log('\n');

        // Update the template
        console.log('Updating the template...');
        const updated = await client.templates.update(template.template_id, {
            name: 'Updated Template Name - ' + Date.now()
        });
        console.log('✅ Template updated:', updated.name);
        console.log('\n');

        // Clean up - delete the test template
        console.log('Cleaning up...');
        await client.templates.delete(template.template_id);
        console.log('✅ Test template deleted');
        console.log('\n🎉 All operations completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);

        if (error.name === 'ValidationError') {
            console.error('\nValidation errors:');
            error.errors.forEach(err => {
                console.error(`  - ${err.field}: ${err.message}`);
            });
        } else if (error.name === 'AuthenticationError') {
            console.error('\n💡 Your API key appears to be invalid.');
            console.error('   Please check your .env file and verify the key at:');
            console.error('   https://docstron.com/dashboard');
        } else if (error.name === 'NotFoundError') {
            console.error('\n💡 Application not found.');
            console.error('   Please check your DOCSTRON_APP_ID in .env file');
        } else if (error.statusCode === 0) {
            console.error('\n💡 Cannot connect to Docstron API.');
            console.error('   Possible issues:');
            console.error('   - Check your internet connection');
            console.error('   - Verify the API endpoint is correct');
            console.error('   - API might be temporarily unavailable');
        }
    }
}

basicExample();