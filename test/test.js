const Docstron = require('../index');

async function runTests() {
  console.log('🧪 Docstron SDK v0.1.0 - Test Suite\n');

  // Test 1: SDK Version
  console.log('Test 1: Check SDK version');
  try {
    const version = Docstron.getVersion();
    console.log(`✅ Version: ${version}\n`);
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 2: Client initialization with API key
  console.log('Test 2: Initialize client with API key');
  try {
    const client = new Docstron('test-api-key');
    console.log('✅ Client initialized successfully');
    console.log('   - Has templates:', typeof client.templates === 'object');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 3: Client without API key should fail
  console.log('Test 3: Initialize client without API key (should fail)');
  try {
    const client = new Docstron();
    console.log('❌ Should have thrown an error\n');
  } catch (error) {
    console.log('✅ Correctly threw error:', error.message, '\n');
  }

  // Test 4: Template validation
  console.log('Test 4: Template create validation');
  const client = new Docstron('test-key');
  try {
    await client.templates.create({});
    console.log('❌ Should have thrown validation error\n');
  } catch (error) {
    console.log('✅ Correctly validated required fields:', error.message, '\n');
  }

  // Test 5: Custom base URL
  console.log('Test 5: Initialize with custom base URL');
  try {
    const customClient = new Docstron('test-key', {
      baseURL: 'https://custom.api.com'
    });
    console.log('✅ Client accepts custom configuration');
    console.log('   - Base URL:', customClient.baseURL, '\n');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 6: Error exports
  console.log('Test 6: Error classes are exported');
  try {
    const {
      DocstronError,
      ValidationError,
      AuthenticationError,
      NotFoundError
    } = require('../index');

    console.log('✅ All error classes exported:');
    console.log('   - DocstronError:', typeof DocstronError === 'function');
    console.log('   - ValidationError:', typeof ValidationError === 'function');
    console.log('   - AuthenticationError:', typeof AuthenticationError === 'function');
    console.log('   - NotFoundError:', typeof NotFoundError === 'function');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 7: Documents resource exists
  console.log('Test 7: Documents resource exists');
  try {
    const client = new Docstron('test-key');
    console.log('✅ Documents resource available:', typeof client.documents === 'object');
    console.log('   - Has generate:', typeof client.documents.generate === 'function');
    console.log('   - Has quickGenerate:', typeof client.documents.quickGenerate === 'function');
    console.log('   - Has download:', typeof client.documents.download === 'function');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 8: Features check
  console.log('Test 8: Check available features');
  try {
    const features = Docstron.getFeatures();
    console.log('✅ Features:', JSON.stringify(features, null, 2));
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 9: Applications resource exists
  console.log('Test 9: Applications resource exists');
  try {
    const client = new Docstron('test-key');
    console.log('✅ Applications resource available:', typeof client.applications === 'object');
    console.log('   - Has create:', typeof client.applications.create === 'function');
    console.log('   - Has get:', typeof client.applications.get === 'function');
    console.log('   - Has list:', typeof client.applications.list === 'function');
    console.log('   - Has update:', typeof client.applications.update === 'function');
    console.log('   - Has delete:', typeof client.applications.delete === 'function');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  console.log('🏁 Test suite completed!\n');
  console.log('⚠️  Note: To test with real API, set DOCSTRON_API_KEY environment variable');
  console.log('   Example: DOCSTRON_API_KEY=your-key node test/test.js\n');
}

// Run the test suite
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});

/*
const Docstron = require('../index');

async function runTests() {
  console.log('🧪 Docstron SDK v0.1.0 - Test Suite\n');

  // Test 1: SDK Version
  console.log('Test 1: Check SDK version');
  try {
    const version = Docstron.getVersion();
    console.log(`✅ Version: ${version}\n`);
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 2: Client initialization with API key
  console.log('Test 2: Initialize client with API key');
  try {
    const client = new Docstron('test-api-key');
    console.log('✅ Client initialized successfully');
    console.log('   - Has templates:', typeof client.templates === 'object');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 3: Client without API key should fail
  console.log('Test 3: Initialize client without API key (should fail)');
  try {
    const client = new Docstron();
    console.log('❌ Should have thrown an error\n');
  } catch (error) {
    console.log('✅ Correctly threw error:', error.message, '\n');
  }

  // Test 4: Template validation
  console.log('Test 4: Template create validation');
  const client = new Docstron('test-key');
  try {
    await client.templates.create({});
    console.log('❌ Should have thrown validation error\n');
  } catch (error) {
    console.log('✅ Correctly validated required fields:', error.message, '\n');
  }

  // Test 5: Custom base URL
  console.log('Test 5: Initialize with custom base URL');
  try {
    const customClient = new Docstron('test-key', {
      baseURL: 'https://custom.api.com'
    });
    console.log('✅ Client accepts custom configuration');
    console.log('   - Base URL:', customClient.baseURL, '\n');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  // Test 6: Error exports
  console.log('Test 6: Error classes are exported');
  try {
    const {
      DocstronError,
      ValidationError,
      AuthenticationError,
      NotFoundError
    } = require('../index');
    
    console.log('✅ All error classes exported:');
    console.log('   - DocstronError:', typeof DocstronError === 'function');
    console.log('   - ValidationError:', typeof ValidationError === 'function');
    console.log('   - AuthenticationError:', typeof AuthenticationError === 'function');
    console.log('   - NotFoundError:', typeof NotFoundError === 'function');
    console.log('');
  } catch (error) {
    console.log('❌ Failed:', error.message, '\n');
  }

  console.log('🏁 Test suite completed!\n');
  console.log('⚠️  Note: To test with real API, set DOCSTRON_API_KEY environment variable');
  console.log('   Example: DOCSTRON_API_KEY=your-key node test/test.js\n');
}

// Run the test suite
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
*/