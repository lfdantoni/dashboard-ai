#!/usr/bin/env node

/**
 * Runtime configuration injector for Vite apps
 * Automatically injects all environment variables starting with VITE_ into runtime-config.js
 */

const fs = require('fs');
const path = require('path');

// Determine paths based on execution context
const isDocker = fs.existsSync('/app/dist');
const distPath = isDocker ? '/app/dist' : path.join(__dirname, '../dist');
const runtimeConfigPath = path.join(distPath, 'runtime-config.js');

// Get all environment variables that start with VITE_
const viteEnvVars = {};
const envVarNames = [];

for (const key in process.env) {
  if (key.startsWith('VITE_')) {
    // Trim whitespace to avoid issues with shell variable setting
    const value = String(process.env[key] || '').trim();
    viteEnvVars[key] = value;
    envVarNames.push(key);
  }
}

// Generate the config object dynamically
const configEntries = Object.entries(viteEnvVars)
  .map(([key, value]) => {
    // Escape single quotes and backslashes in the value
    const escapedValue = String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `  ${key}: '${escapedValue}'`;
  })
  .join(',\n');

// Generate the runtime config file content
const config = `// Runtime configuration injection
// This script is generated at container startup with actual environment variables
// All variables starting with VITE_ are automatically included
window.__ENV__ = {
${configEntries}
};
`;

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Write to dist
fs.writeFileSync(runtimeConfigPath, config, 'utf8');

// Log results
console.log('✅ Runtime configuration injected successfully');
console.log(`   Config written to: ${runtimeConfigPath}`);
if (envVarNames.length > 0) {
  console.log(`   Variables injected: ${envVarNames.join(', ')}`);
} else {
  console.warn('⚠️  Warning: No VITE_* environment variables found');
}

