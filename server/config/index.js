module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Microsoft Graph API
  ms: {
    clientId: process.env.MS_CLIENT_ID,
    clientSecret: process.env.MS_CLIENT_SECRET,
    tenantId: process.env.MS_TENANT_ID,
  },

  // Anthropic Claude
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Bluebeam (Phase 2)
  bluebeam: {
    clientId: process.env.BLUEBEAM_CLIENT_ID,
    clientSecret: process.env.BLUEBEAM_CLIENT_SECRET,
  },

  // Autodesk Construction Cloud (Phase 2)
  acc: {
    clientId: process.env.ACC_CLIENT_ID,
    clientSecret: process.env.ACC_CLIENT_SECRET,
  },
};
