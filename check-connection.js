// Quick check - create check-connection.js
require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.DOCSTRON_API_KEY;
const BASE_URL = 'https://api.docstron.com';

console.log('Testing connection to Docstron API...');
console.log('Base URL:', BASE_URL);
console.log('API Key:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'NOT SET');

axios.get(BASE_URL + '/v1/templates', {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'applicaiton/json'
  },
  timeout: 10000
})
.then(response => {
  console.log('✅ Connection successful!');
  console.log('Status:', response.status);
})
.catch(error => {
  console.error('❌ Connection failed!');
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Message:', error.response.data);
  } else if (error.request) {
    console.error('No response received');
    console.error('Error:', error.message);
  } else {
    console.error('Error:', error.message);
  }
});


/*
require('dotenv').config();
const axios = require('axios');

const KEY = process.env.DOCSTRON_API_KEY;

const urls = [
  'https://api.docstron.com',
  'https://docstron.com/api',
  'https://backend.docstron.com',
  'https://docstron.com',
];

(async () => {
  for (const url of urls) {
    console.log(`\n👉 Testing: ${url}/templates`);

    try {
      const res = await axios.get(url + '/templates', {
        headers: { 'x-api-key': KEY },
        timeout: 5000,
      });
      console.log('✔️ SUCCESS', res.status);
    } catch (err) {
      console.log('❌ FAILED');
      console.log(err.code || err.message);
    }
  }
})();
*/

// require('dotenv').config();
// const axios = require('axios');
// const HttpsProxyAgent = require('https-proxy-agent');

// const API_KEY = process.env.DOCSTRON_API_KEY;

// // corporate proxy
// const proxyUrl = 'http://10.0.1.222:8080';
// const httpsAgent = new HttpsProxyAgent(proxyUrl);

// // Correct Docstron API base
// const BASE_URL = 'https://api.docstron.com';

// (async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/v1/templates`, {
//       headers: {
//         'x-api-key': API_KEY,         // ✅ correct
//         'Accept': 'application/json'
//       },
//       httpsAgent,
//       proxy: false,                   // IMPORTANT
//       timeout: 15000
//     });

//     console.log('SUCCESS:', res.status);
//     console.log(res.data);

//   } catch (err) {
//     console.error('FAILED');

//     if (err.response) {
//       console.log('Status:', err.response.status);
//       console.log('Data:', err.response.data);
//     } else {
//       console.log(err.message);
//     }
//   }
// })();

