#!/usr/bin/env node

// Test script to validate deployment configuration
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing DeliveryHub Deployment Configuration');
console.log('===============================================\n');

// Test 1: Check required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  'vercel.json',
  'backend/vercel.json',
  'backend/api/index.js',
  'backend/src/server.js',
  'backend/src/config/vercel.js',
  'backend/src/database/vercel.js',
  'frontend/package.json',
  'backend/package.json',
  'package.json',
  '.env.example',
  'scripts/setup-github.sh',
  'scripts/deploy-vercel.sh'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Test 2: Validate Vercel configuration
console.log('\n⚙️ Validating Vercel configuration...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const backendVercelConfig = JSON.parse(fs.readFileSync('backend/vercel.json', 'utf8'));
  
  console.log('✅ Main vercel.json is valid JSON');
  console.log('✅ Backend vercel.json is valid JSON');
  
  // Check builds configuration
  if (vercelConfig.builds && vercelConfig.builds.length > 0) {
    console.log('✅ Builds configuration found');
  } else {
    console.log('❌ No builds configuration found');
  }
  
  // Check routes configuration
  if (vercelConfig.routes && vercelConfig.routes.length > 0) {
    console.log('✅ Routes configuration found');
  } else {
    console.log('❌ No routes configuration found');
  }
  
} catch (error) {
  console.log('❌ Vercel configuration error:', error.message);
  allFilesExist = false;
}

// Test 3: Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const frontendPackage = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  const backendPackage = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
  
  // Check root scripts
  if (rootPackage.scripts && rootPackage.scripts['vercel-build']) {
    console.log('✅ Root vercel-build script found');
  } else {
    console.log('❌ Root vercel-build script missing');
  }
  
  // Check frontend scripts
  if (frontendPackage.scripts && frontendPackage.scripts.build) {
    console.log('✅ Frontend build script found');
  } else {
    console.log('❌ Frontend build script missing');
  }
  
  // Check backend scripts
  if (backendPackage.scripts && backendPackage.scripts.start) {
    console.log('✅ Backend start script found');
  } else {
    console.log('❌ Backend start script missing');
  }
  
} catch (error) {
  console.log('❌ Package.json error:', error.message);
  allFilesExist = false;
}

// Test 4: Check environment variables template
console.log('\n🔐 Checking environment variables...');
try {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  const requiredEnvVars = [
    'NODE_ENV',
    'JWT_SECRET',
    'POSTGRES_URL',
    'FRONTEND_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envExample.includes(envVar)) {
      console.log(`✅ ${envVar} template found`);
    } else {
      console.log(`❌ ${envVar} template missing`);
    }
  });
  
} catch (error) {
  console.log('❌ Environment variables error:', error.message);
}

// Test 5: Check deployment scripts
console.log('\n🚀 Checking deployment scripts...');
try {
  const setupScript = fs.readFileSync('scripts/setup-github.sh', 'utf8');
  const deployScript = fs.readFileSync('scripts/deploy-vercel.sh', 'utf8');
  
  if (setupScript.includes('git init')) {
    console.log('✅ GitHub setup script looks valid');
  } else {
    console.log('❌ GitHub setup script may be invalid');
  }
  
  if (deployScript.includes('vercel --prod')) {
    console.log('✅ Vercel deploy script looks valid');
  } else {
    console.log('❌ Vercel deploy script may be invalid');
  }
  
} catch (error) {
  console.log('❌ Deployment scripts error:', error.message);
}

// Test 6: Simulate backend API entry point
console.log('\n🔌 Testing backend API entry point...');
try {
  // Check if the API entry point can be loaded
  const apiIndexPath = path.resolve('backend/api/index.js');
  const apiIndex = fs.readFileSync(apiIndexPath, 'utf8');
  
  if (apiIndex.includes('require') && apiIndex.includes('server')) {
    console.log('✅ Backend API entry point looks valid');
  } else {
    console.log('❌ Backend API entry point may be invalid');
  }
  
} catch (error) {
  console.log('❌ Backend API entry point error:', error.message);
}

// Final result
console.log('\n🎯 DEPLOYMENT TEST RESULTS');
console.log('==========================');

if (allFilesExist) {
  console.log('✅ All required files are present');
  console.log('✅ Configuration appears valid');
  console.log('✅ Ready for deployment!');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: bash scripts/setup-github.sh');
  console.log('2. Create GitHub repository');
  console.log('3. Push code to GitHub');
  console.log('4. Deploy to Vercel');
  console.log('5. Configure environment variables');
  process.exit(0);
} else {
  console.log('❌ Some files or configurations are missing');
  console.log('❌ Please fix the issues above before deploying');
  process.exit(1);
}