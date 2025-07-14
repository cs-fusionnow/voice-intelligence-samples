const client = require('./twilioClient');

export default async function handler(req, res) {
  const { serviceSid, transcriptSid } = req.query;
  const spaBase = process.env.TRANSCRIPT_VIEWER_ASSET_URL;

  if (serviceSid && transcriptSid) {
    const token = await client.getTranscriptViewerToken(serviceSid, transcriptSid);
    const redirectUrl = `${spaBase}?token=${token}`;
    return res.writeHead(302, { Location: redirectUrl }).end();
  }

  // Basic fallback for errors (can customize)
  return res.status(400).json({ error: "Missing serviceSid or transcriptSid" });
}
