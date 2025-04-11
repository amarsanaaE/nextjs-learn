// Facebook API configuration

interface FacebookConfig {
  appId: string;
  pageId: string;
  pageAccessToken: string;
  verifyToken: string;
}

// Replace these with your actual credentials
const facebookConfig: FacebookConfig = {
  appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '1427973608364187',
  pageId: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '597355006801976',
  pageAccessToken: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ACCESS_TOKEN || 'EAAUSvAOs2JsBOyUNCKfKv2vXiq1wfDv28ZBQVL98ra6ZAZCCIQq1kWrPCQxhYPciuRKXsb4aImnNslXZCGSiyWkHGkOiiROwR8zgtZC76pAVEAgzjfCcwDNGNqZC0ZAikrevZBqNxoeSAlLtSYZA1KS4F1EE65oZC1SzdR7a5JU8hyuULX9ML3yTVi45b5Nnqa1P4AcQZDZD',
  verifyToken: 'your_verify_token_123', // The verification token you provided
};

export default facebookConfig;