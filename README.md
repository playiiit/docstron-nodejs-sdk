# Docstron SDK for Node.js

[![npm version](https://img.shields.io/npm/v/docstron.svg)](https://www.npmjs.com/package/docstron)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Node.js library for the [Docstron](https://docstron.com) PDF Generation API.

> **Current Version: v0.1.0 - Template Management**  
> This is an early release focused on template operations. Document generation coming in v0.2.0!

## 📋 What's Included in v0.1.0

✅ **Template Management**
- Create templates with HTML content
- Get template details
- Update existing templates
- Delete templates
- List all templates

🚧 **Coming Soon**
- v0.2.0: Document generation (PDF creation from templates)
- v0.3.0: Application management
- v1.0.0: Full feature set with comprehensive testing

## Installation
```bash
npm install docstron
```

## Quick Start
```javascript
const Docstron = require('docstron');

// Initialize the client
const client = new Docstron('your-api-key-here');

// Create a template
const template = await client.templates.create({
  application_id: 'app-xxx',
  name: 'Invoice Template',
  content: '<h1>Invoice #{{invoice_number}}</h1><p>Total: {{total}}</p>',
  is_active: true
});

console.log('Template created:', template.template_id);
```

## Authentication

Get your API key from your [Docstron Dashboard](https://docstron.com/dashboard).
```javascript
const client = new Docstron('your-api-key-here');

// With custom options
const client = new Docstron('your-api-key-here', {
  baseURL: 'https://custom-api.docstron.com'
});
```

## API Reference

### Templates

#### `templates.create(params)`

Create a new PDF template.

**Parameters:**
- `application_id` (string, required) - Your application ID
- `name` (string, required) - Template name
- `content` (string, required) - HTML content with `{{placeholders}}`
- `is_active` (boolean, optional) - Active status (default: `true`)
- `extra_css` (string, optional) - Additional CSS rules for PDF styling

**Returns:** Promise<Template>

**Example:**
```javascript
const template = await client.templates.create({
  application_id: 'app-7b4d78fb-820c-4ca9-84cc-46953f211234',
  name: 'Invoice Template',
  content: `
    <html>
      <body>
        <h1>Invoice</h1>
        <p>Customer: {{customer_name}}</p>
        <p>Total: {{total_amount}}</p>
      </body>
    </html>
  `,
  is_active: true,
  extra_css: '@page { margin: 2cm; }'
});
```

#### `templates.get(templateId)`

Retrieve a specific template by ID.

**Parameters:**
- `templateId` (string, required) - The template ID

**Returns:** Promise<Template>

**Example:**
```javascript
const template = await client.templates.get('template-xxx');
console.log(template.name);
```

#### `templates.update(templateId, params)`

Update an existing template.

**Parameters:**
- `templateId` (string, required) - The template ID
- `params` (object, required) - Fields to update

**Returns:** Promise<Template>

**Example:**
```javascript
const updated = await client.templates.update('template-xxx', {
  name: 'Updated Invoice Template',
  is_active: false
});
```

#### `templates.delete(templateId)`

Delete a template.

**Parameters:**
- `templateId` (string, required) - The template ID

**Returns:** Promise<Object>

**Example:**
```javascript
await client.templates.delete('template-xxx');
console.log('Template deleted');
```

#### `templates.list(applicationId)`

List all templates for an application.

**Parameters:**
- `applicationId` (string, required) - The application ID

**Returns:** Promise<Array<Template>>

**Example:**
```javascript
const templates = await client.templates.list('app-xxx');
console.log(`Found ${templates.length} templates`);
```

### Documents (v0.2.0+)

#### `documents.generate(templateId, options)`

Generate a PDF from a template.

**Parameters:**
- `templateId` (string, required) - Template ID
- `options.data` (object, required) - Data for placeholders
- `options.response_type` (string, optional) - `'pdf'`, `'json_with_base64'`, or `'document_id'` (default)
- `options.password` (string, optional) - Password protect the PDF

**Returns:** Document object or PDF buffer

**Example:**
```javascript
const doc = await client.documents.generate(templateId, {
  data: {
    customer_name: 'John Doe',
    invoice_number: 'INV-001',
    total: '$299.00'
  },
  response_type: 'document_id'
});

console.log('Download URL:', doc.download_url);
```

#### `documents.quickGenerate(options)`

Generate a PDF without creating a template first.

**Parameters:**
- `options.html` (string, required) - HTML content
- `options.data` (object, required) - Data for placeholders
- `options.response_type` (string, optional) - Response format
- `options.extra_css` (string, optional) - Additional CSS
- `options.save_template` (boolean, optional) - Save as reusable template
- `options.application_id` (string, conditional) - Required if save_template is true
- `options.password` (string, optional) - Password protect the PDF

**Example:**
```javascript
const doc = await client.documents.quickGenerate({
  html: '<h1>Hello {{name}}</h1>',
  data: { name: 'World' },
  response_type: 'document_id'
});
```

#### `documents.get(documentId)`

Get document details.

**Example:**
```javascript
const doc = await client.documents.get('document-xxx');
console.log(doc.template_id, doc.created_at);
```

#### `documents.list()`

List all documents.

**Example:**
```javascript
const docs = await client.documents.list();
console.log(`Total documents: ${docs.length}`);
```

#### `documents.download(documentId, filepath)`

Download a PDF document.

**Parameters:**
- `documentId` (string, required) - Document ID
- `filepath` (string, optional) - Local path to save the PDF

**Example:**
```javascript
// Save to file
await client.documents.download('document-xxx', './invoice.pdf');

// Get as buffer
const buffer = await client.documents.download('document-xxx');
```

#### `documents.update(documentId, data)`

Update document data.

#### `documents.delete(documentId)`

Delete a document.


### Applications (v0.3.0+)

#### `applications.create(params)`

Create a new application to organize your templates and documents.

**Parameters:**
- `params.name` (string, required) - Application name
- `params.description` (string, optional) - Application description
- `params.is_active` (boolean, optional) - Active status (default: `true`)

**Returns:** Promise<Application>

**Example:**
```javascript
const app = await client.applications.create({
  name: 'Invoice System',
  description: 'Manages all customer invoices',
  is_active: true
});

console.log('App ID:', app.app_id);
```

#### `applications.get(appId)`

Get details of a specific application.

**Example:**
```javascript
const app = await client.applications.get('app-xxx');
console.log(app.name, app.is_active);
```

#### `applications.list()`

List all applications in your account.

**Example:**
```javascript
const apps = await client.applications.list();
console.log(`Total applications: ${apps.length}`);

apps.forEach(app => {
  console.log(`- ${app.name} (${app.is_active ? 'Active' : 'Inactive'})`);
});
```

#### `applications.update(appId, params)`

Update an existing application.

**Parameters:**
- `appId` (string, required) - Application ID
- `params.name` (string, optional) - New name
- `params.description` (string, optional) - New description
- `params.is_active` (boolean, optional) - New active status

**Example:**
```javascript
const updated = await client.applications.update('app-xxx', {
  name: 'Updated Invoice System',
  is_active: false
});
```

#### `applications.delete(appId)`

Delete an application.

**Example:**
```javascript
await client.applications.delete('app-xxx');
console.log('Application deleted');
```

#### `applications.listActive()`

Get only active applications.

**Example:**
```javascript
const activeApps = await client.applications.listActive();
console.log(`Active: ${activeApps.length}`);
```

#### `applications.listInactive()`

Get only inactive applications.

**Example:**
```javascript
const inactiveApps = await client.applications.listInactive();
console.log(`Inactive: ${inactiveApps.length}`);
```

## Response Types

When generating documents, you can choose the response format:

### `document_id` (default)
Returns document ID and download URL - best for most use cases.
```javascript
{
  document_id: "document-xxx",
  template_id: "template-xxx",
  download_url: "https://api.docstron.com/v1/documents/download/document-xxx",
  size_bytes: 5370
}
```

### `json_with_base64`
Returns base64-encoded PDF content - useful for immediate processing.
```javascript
{
  document_id: "document-xxx",
  pdf_content: "JVBERi0xLjcK...",
  filename: "document.pdf",
  size_bytes: 5370
}
```

### `pdf`
Returns raw PDF binary data - useful for direct download endpoints.


## Template Placeholders

Use double curly braces to create dynamic placeholders:
```html
<h1>Hello {{customer_name}}!</h1>
<p>Order #{{order_number}} - Total: {{total_amount}}</p>
<p>Date: {{order_date}}</p>
```

When generating PDFs (coming in v0.2.0), you'll pass data to fill these placeholders:
```javascript
// Coming in v0.2.0
{
  customer_name: "John Doe",
  order_number: "12345",
  total_amount: "$299.00",
  order_date: "2025-11-08"
}
```

## Error Handling

The SDK provides specific error types for better error handling:
```javascript
const {
  DocstronError,
  ValidationError,
  AuthenticationError,
  NotFoundError
} = require('docstron');

try {
  await client.templates.create({...});
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:');
    error.errors.forEach(err => {
      console.error(`- ${err.field}: ${err.message}`);
    });
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.error('Template or application not found');
  } else if (error instanceof DocstronError) {
    console.error('API error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Examples

### Complete Workflow
```javascript
const Docstron = require('docstron-sdk');
const client = new Docstron('your-api-key');

// 1. Create template
const template = await client.templates.create({
  application_id: 'app-xxx',
  name: 'Invoice',
  content: '<h1>Invoice #{{invoice_no}}</h1>'
});

// 2. Generate PDF
const pdf = await client.documents.generate(template.template_id, {
  data: { invoice_no: '12345' },
  response_type: 'document_id'
});

// 3. Download PDF
await client.documents.download(pdf.document_id, './invoice.pdf');

console.log('PDF saved to invoice.pdf');
```

### Quick Generation
```javascript
// Generate without creating a template
const doc = await client.documents.quickGenerate({
  html: '<h1>Receipt</h1><p>Total: {{total}}</p>',
  data: { total: '$99.00' },
  response_type: 'document_id'
});

console.log('PDF URL:', doc.download_url);
```

### Password Protection
```javascript
const doc = await client.documents.generate(templateId, {
  data: { /* your data */ },
  password: 'SecurePass123!',
  response_type: 'document_id'
});
```

### Basic Usage
```bash
DOCSTRON_API_KEY=your-key npm run example
```

### Create Invoice Template
```bash
DOCSTRON_API_KEY=your-key npm run example:invoice
```

## Development
```bash
# Install dependencies
npm install

# Run tests (basic validation tests)
npm test

# Run examples
npm run example
npm run example:invoice
```

## Requirements

- Node.js >= 14.0.0
- A Docstron account and API key

## Roadmap

### v0.2.0 (Coming Soon)
- 📄 Document generation from templates
- 🔄 Asynchronous PDF processing
- 📥 Multiple output formats (URL, base64, binary)

### v0.3.0 (Planned)
- 🏢 Application management
- 📊 Usage statistics
- 🔐 Advanced authentication options

### v1.0.0 (Future)
- 🎯 Full API coverage
- ✅ Comprehensive test suite
- 📚 Extended documentation
- 🔌 Webhook support

## Support

- 📧 Email: support@docstron.com
- 📚 Documentation: https://docs.docstron.com
- 🐛 Issues: https://github.com/yourusername/docstron-sdk/issues
- 💬 Discussions: https://github.com/yourusername/docstron-sdk/discussions

## Contributing

Contributions are welcome! This is an early-stage project, and we'd love your help making it better.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Changelog

### [0.3.0] - 2025-11-17

### Added
- Application management (create, get, list, update, delete)
- Filter active/inactive applications with `listActive()` and `listInactive()`
- Complete workflow example (Application → Template → Document)
- Application organization best practices

### Examples
- `manage-applications.js` - Full application CRUD examples
- `complete-workflow-with-apps.js` - End-to-end workflow demonstration

### Improvements
- Updated all documentation with application examples
- Added application organization patterns
- Complete SDK feature set (Templates, Documents, Applications)

### [0.2.0] - 2025-11-17

### Added
- Document generation from templates
- Quick PDF generation without templates
- Document management (get, list, update, delete)
- PDF download functionality
- Password protection for PDFs
- Multiple response type support

### [0.1.0] - 2025-11-17

### Added
- Initial release
- Template management (CRUD operations)
- Basic error handling



# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Build
dist/
build/

# Optional npm cache
.npm

# Optional eslint cache
.eslintcache
```

### 4. .npmignore
```
# Development files
test/
examples/
.vscode/
.idea/

# Git files
.git/
.gitignore
.gitattributes

# CI/CD
.github/
.travis.yml
.gitlab-ci.yml

# Documentation source
docs/

## Complete Workflow Example

Here's a complete example showing all features working together:
```javascript
const Docstron = require('docstron-sdk');
const client = new Docstron('your-api-key');

// 1. Create application
const app = await client.applications.create({
  name: 'My Invoice App',
  description: 'Customer invoicing system'
});

// 2. Create template in the application
const template = await client.templates.create({
  application_id: app.app_id,
  name: 'Standard Invoice',
  content: '<h1>Invoice #{{number}}</h1><p>Total: {{total}}</p>'
});

// 3. Generate PDF from template
const doc = await client.documents.generate(template.template_id, {
  data: {
    number: '12345',
    total: '$999.00'
  }
});

// 4. Download the PDF
await client.documents.download(doc.document_id, './invoice.pdf');

console.log('✅ Complete workflow finished!');
```

## Application Organization Best Practices

# Environment
.env
.env.*

# Logs
*.log

# Editor files
*.swp
*.swo
*~
```

### 5. LICENSE (MIT)
```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.