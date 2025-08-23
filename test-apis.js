// Test script for Cybershield Backend APIs
// Run with: node test-apis.js

const BASE_URL = 'http://localhost:3000'

async function testSocialCheckerAPI() {
  console.log('🧪 Testing Social Profile Checker API...')
  
  try {
    const response = await fetch(`${BASE_URL}/api/social-checker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform: 'twitter',
        username: 'testuser'
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Social Profile Checker API working!')
      console.log('Response:', JSON.stringify(data, null, 2))
    } else {
      console.log('❌ Social Profile Checker API error:', data.error)
    }
  } catch (error) {
    console.log('❌ Social Profile Checker API failed:', error.message)
  }
}

async function testQRScannerAPI() {
  console.log('\n🧪 Testing QR Code Scanner API...')
  
  try {
    // Test with a sample base64 image data
    const sampleImageData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    
    const response = await fetch(`${BASE_URL}/api/qr-scanner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData: sampleImageData,
        imageFormat: 'png'
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ QR Code Scanner API working!')
      console.log('Response:', JSON.stringify(data, null, 2))
    } else {
      console.log('❌ QR Code Scanner API error:', data.error)
    }
  } catch (error) {
    console.log('❌ QR Code Scanner API failed:', error.message)
  }
}

async function testAPIEndpoints() {
  console.log('🚀 Testing Cybershield Backend APIs...\n')
  
  // Test GET endpoints
  try {
    const socialResponse = await fetch(`${BASE_URL}/api/social-checker`)
    const qrResponse = await fetch(`${BASE_URL}/api/qr-scanner`)
    
    console.log('📡 API Endpoints Status:')
    console.log(`Social Checker: ${socialResponse.ok ? '✅' : '❌'} ${socialResponse.status}`)
    console.log(`QR Scanner: ${qrResponse.ok ? '✅' : '❌'} ${qrResponse.status}`)
  } catch (error) {
    console.log('❌ Failed to test API endpoints:', error.message)
  }
  
  // Test POST endpoints
  await testSocialCheckerAPI()
  await testQRScannerAPI()
  
  console.log('\n✨ API testing completed!')
}

// Run tests
testAPIEndpoints().catch(console.error)
