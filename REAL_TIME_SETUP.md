# Real-Time Backend Setup Guide

This guide explains how to set up the real-time backend functionality for the Cybershield security tools.

## Overview

The real-time backend provides:
- **Social Profile Checker**: Real-time analysis of social media profiles across multiple platforms
- **QR Code Analyzer**: Real-time QR code scanning with threat intelligence integration
- **Threat Intelligence**: Integration with multiple security APIs for comprehensive analysis

## Prerequisites

- Node.js 18+ and npm/pnpm
- Access to social media platform APIs
- Threat intelligence API keys
- Environment variables configured

## Environment Variables Setup

1. Copy `env.example` to `.env.local`:
```bash
cp env.example .env.local
```

2. Fill in your API keys in `.env.local`:

### Social Media APIs

#### Twitter/X API
```bash
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
```
- Get from [Twitter Developer Portal](https://developer.twitter.com/)
- Requires Elevated access for v2 API

#### Instagram API
```bash
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
```
- Get from [Facebook Developer Portal](https://developers.facebook.com/)
- Requires Instagram Basic Display API setup

#### Facebook API
```bash
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
```
- Get from [Facebook Developer Portal](https://developers.facebook.com/)
- Requires Facebook Login setup

#### LinkedIn API
```bash
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token_here
```
- Get from [LinkedIn Developer Portal](https://developer.linkedin.com/)
- Requires OAuth 2.0 setup

#### YouTube API
```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
```
- Get from [Google Cloud Console](https://console.cloud.google.com/)
- Enable YouTube Data API v3

#### Reddit API
```bash
REDDIT_ACCESS_TOKEN=your_reddit_access_token_here
```
- Get from [Reddit Developer Portal](https://www.reddit.com/prefs/apps)
- Requires OAuth 2.0 setup

#### Discord API
```bash
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```
- Get from [Discord Developer Portal](https://discord.com/developers/applications)
- Create a bot application

### Threat Intelligence APIs

#### VirusTotal API
```bash
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
```
- Get from [VirusTotal](https://www.virustotal.com/gui/join-us)
- Free tier: 4 requests/minute, 500 requests/day

#### Google Safe Browsing API
```bash
GOOGLE_SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key_here
```
- Get from [Google Cloud Console](https://console.cloud.google.com/)
- Enable Safe Browsing API
- Free tier: 10,000 requests/day

#### PhishTank API
```bash
OPENPHISH_API_KEY=your_openphish_api_key_here
```
- Get from [OpenPhish](https://openphish.com/)
- Free tier available

## Installation & Setup

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Install additional packages for QR code processing:
```bash
npm install jsqr qrcode-reader
# or
pnpm add jsqr qrcode-reader
```

3. Set up environment variables (see above)

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

## API Endpoints

### Social Profile Checker
- **POST** `/api/social-checker`
- Analyzes social media profiles in real-time
- Supports: Twitter, Instagram, Facebook, LinkedIn, TikTok, YouTube, Reddit, Discord

### QR Code Scanner
- **POST** `/api/qr-scanner`
- Analyzes QR codes with threat intelligence
- Supports: JPEG, PNG, GIF, WebP formats

## Real-Time Features

### Social Profile Analysis
- **Platform-specific APIs**: Direct integration with social media platforms
- **Fallback mechanisms**: Web scraping when APIs are unavailable
- **Risk assessment**: AI-powered authenticity scoring
- **Real-time data**: Live profile information and activity status

### QR Code Analysis
- **Content detection**: URL, email, phone, WiFi, vCard, text
- **Threat intelligence**: Multi-source security checking
- **Pattern analysis**: Suspicious content detection
- **Risk scoring**: Comprehensive security assessment

### Threat Intelligence Integration
- **VirusTotal**: Malware and phishing detection
- **Google Safe Browsing**: Real-time threat database
- **PhishTank**: Phishing URL database
- **OpenPhish**: Additional phishing intelligence

## Production Deployment

### Environment Setup
1. Set all required environment variables
2. Use production-grade API keys
3. Implement rate limiting
4. Set up monitoring and logging

### Security Considerations
- API keys should be kept secure
- Implement request validation
- Add rate limiting to prevent abuse
- Monitor API usage and costs

### Performance Optimization
- Implement caching for API responses
- Use connection pooling for databases
- Add request queuing for high traffic
- Monitor API response times

## Troubleshooting

### Common Issues

#### API Rate Limits
- Most social media APIs have rate limits
- Implement exponential backoff
- Add request queuing for high traffic

#### Authentication Errors
- Check API key validity
- Verify OAuth token expiration
- Ensure proper scopes are granted

#### Network Timeouts
- Increase timeout values
- Implement retry logic
- Use fallback mechanisms

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=cybershield:*
```

## API Response Examples

### Social Profile Analysis
```json
{
  "success": true,
  "data": {
    "platform": "twitter",
    "username": "example_user",
    "displayName": "Example User",
    "isVerified": true,
    "authenticityScore": 92,
    "riskLevel": "low",
    "redFlags": [],
    "greenFlags": ["Verified account", "Long-standing account"],
    "recommendations": ["Safe to interact with"]
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### QR Code Analysis
```json
{
  "success": true,
  "data": {
    "content": "https://example.com",
    "type": "url",
    "isSafe": true,
    "riskLevel": "low",
    "warnings": [],
    "recommendations": ["URL appears safe"],
    "securityChecks": {
      "urlSafety": {
        "isMalicious": false,
        "threatTypes": [],
        "reputation": 100
      }
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check environment variable configuration
4. Verify API key permissions and scopes

## License

This project is part of Cybershield - Cybersecurity Education Platform
