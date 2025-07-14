const fetch = require('node-fetch');

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const twilioEncodedCreds = Buffer.from(`${twilioApiKey}:${twilioApiSecret}`).toString('base64');

module.exports = {
    getTranscriptsTokenWithViewerRedirect: async () => {
    const viewLinkTemplate = `${process.env.APP_BASE_URL}/api/transcript-viewer-standalone?serviceSid=:serviceSid&transcriptSid=:transcriptSid`;

    const rsp = await fetch('https://ai.twilio.com/v1/Tokens', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${twilioEncodedCreds}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grants: [{
          product: 'intelligence-discovery',
          metadata: {
            viewLinks: {
              conversationViewLink: {
                target: "_top",
                href: viewLinkTemplate
              }
            }
          }
        }]
      })
    });

    if (rsp.ok) {
      const { token } = await rsp.json();
      return token;
    } else {
      throw new Error('Failed to generate discovery token with viewer redirect');
    }
  },

  getTranscriptViewerToken: async (serviceSid, transcriptSid) => {
    const rsp = await fetch('https://ai.twilio.com/v1/Tokens', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${twilioEncodedCreds}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grants: [{
          product: 'annotator',
          service_sid: serviceSid,
          transcript_sid: transcriptSid,
          metadata: {}
        }]
      })
    });

    if (rsp.ok) {
      const { token } = await rsp.json();
      return token;
    } else {
      throw new Error('Failed to generate viewer token');
    }
  }
};
getTranscriptsTokenFromViewLink: async (viewLink) => {
  const rsp = await fetch('https://ai.twilio.com/v1/Tokens', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${twilioEncodedCreds}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grants: [{
        product: 'intelligence-discovery',
        metadata: {
          viewLinks: {
            conversationViewLink: {
              target: "_top",
              href: viewLink
            }
          }
        }
      }]
    })
  });

  if (rsp.ok) {
    const { token } = await rsp.json();
    return token;
  } else {
    throw new Error('Failed to generate discovery token with viewLink');
  }
}
