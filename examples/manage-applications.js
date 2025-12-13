require('dotenv').config();
const Docstron = require('../index');

async function manageApplicationsExample() {
    const apiKey = process.env.DOCSTRON_API_KEY;

    if (!apiKey) {
        console.error('❌ Missing DOCSTRON_API_KEY. Please check your .env file.');
        process.exit(1);
    }

    const client = new Docstron(apiKey);

    try {
        console.log('🏢 Application Management Examples\n');
        console.log('='.repeat(50));

        // Example 1: List all applications
        console.log('\n📃 Example 1: List all applications... \n');
        const allApps = await client.applications.list();
        console.log(`✅ Found ${allApps.length} application(s)`);
        allApps.forEach((apps, index) => {
            console.log(` ${index + 1}. ${apps.name} (${apps.app_id})`);
            console.log(`       Status: ${apps.is_active ? 'Active' : 'Inactive'}`);
            console.log(`       Created: ${apps.created_at}`);
        });
        console.log('');

        // Example 2: Create a new application
        console.log('📝 Example 2: Create a new application... \n');
        const newApp = await client.applications.create({
            name: 'Test Application - ' + Date.now(),
            description: 'Created by Node SDK for testing purposes',
            is_active: true
        });
        console.log('✅ Application Created!');
        console.log('   App ID:', newApp.app_id);
        console.log('   Name:', newApp.name);
        console.log('   Description:', newApp.description);
        console.log('   Status:', newApp.is_active ? 'Active' : 'Inactive');
        console.log('   Created:', newApp.created_at);
        console.log('');

        // Example 3: Get specific application details
        console.log('📖 Example 3: Get application details... \n');
        const appDetails = await client.applications.get(newApp.app_id);
        console.log('✅ Applicaiton details retrieved');
        console.log('   Name:', appDetails.name);
        console.log('   Description:', appDetails.description);
        console.log('   Status:', appDetails.is_active ? 'Active' : 'Inactive');
        console.log('   Created:', appDetails.created_at);
        console.log('');

        // Example 4: Update application
        console.log('✏️  Example 4: Update application...\n');
        const updatedApp = await client.applications.update(newApp.app_id, {
            name: 'Updated Test Application',
            description: 'Updated description',
            is_active: true
        });
        console.log('✅ Application updated!');
        console.log('   New Name:', updatedApp.name);
        console.log('   New Description:', updatedApp.description);
        console.log('   Updated At:', updatedApp.updated_at);
        console.log('');

        // Example 5: Deactivate application
        console.log('🔒 Example 5: Deactivate application...\n');
        const deactivated = await client.applications.update(newApp.app_id, {
            is_active: false
        });
        console.log('✅ Application deactivated!');
        console.log('   Status:', deactivated.is_active ? 'Active' : 'Inactive');
        console.log('');

        // Example 6: Get only active applications
        console.log('📋 Example 6: List active applications only...\n');
        const activeApps = await client.applications.listActive();
        console.log(`✅ Found ${activeApps.length} active application(s):`);
        activeApps.forEach((app, index) => {
            console.log(`   ${index + 1}. ${app.name} (${app.app_id})`);
        });
        console.log('');

        // Example 7: Get only inactive applications
        console.log('📋 Example 7: List inactive applications only...\n');
        const inactiveApps = await client.applications.listInactive();
        console.log(`✅ Found ${inactiveApps.length} inactive application(s):`);
        inactiveApps.forEach((app, index) => {
            console.log(`   ${index + 1}. ${app.name} (${app.app_id})`);
        });
        console.log('');

        // Example 8: Delete application (cleanup)
        console.log('🗑️  Example 8: Delete test application...\n');
        await client.applications.delete(newApp.app_id);
        console.log('✅ Application deleted successfully!');
        console.log('');

        console.log('='.repeat(50));
        console.log('🎉 All application management examples completed!\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.name === 'ValidationError') {
            console.error('Validation errors:');
            error.errors?.forEach(err => {
                console.error(`  - ${err.field}: ${err.message}`);
            });
        }
    }
}

manageApplicationsExample();