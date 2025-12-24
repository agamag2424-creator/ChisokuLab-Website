#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const envPath = path.join(process.cwd(), '.env.local');
let CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (key.trim() === 'CONVERTKIT_API_KEY') CONVERTKIT_API_KEY = value;
        if (key.trim() === 'CONVERTKIT_FORM_ID') CONVERTKIT_FORM_ID = value;
      }
    }
  });
}

console.log('🔍 Testing ConvertKit Configuration...\n');
console.log('📋 Environment Variables:');
console.log(`  CONVERTKIT_API_KEY: ${CONVERTKIT_API_KEY ? CONVERTKIT_API_KEY.substring(0, 10) + '...' : 'NOT SET'}`);
console.log(`  CONVERTKIT_FORM_ID: ${CONVERTKIT_FORM_ID || 'NOT SET'}\n`);

if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
  console.log('❌ Missing required environment variables!');
  process.exit(1);
}

const formData = new URLSearchParams();
formData.append("api_key", CONVERTKIT_API_KEY);
formData.append("email", `test-${Date.now()}@example.com`);

const postData = formData.toString();
const options = {
  hostname: 'api.convertkit.com',
  path: `/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`🌐 Testing API: https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe\n`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`📡 Response Status: ${res.statusCode} ${res.statusMessage}\n`);
    try {
      const json = JSON.parse(data);
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! ConvertKit subscription worked!\n');
        console.log('📊 Response:', JSON.stringify(json, null, 2));
      } else {
        console.log('❌ ERROR:', JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.log('📄 Raw Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Network Error:', e.message);
});

req.write(postData);
req.end();
