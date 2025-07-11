const client = require('../client');

export default async function handler(req, res) {
  const { serviceSid, transcriptSid } = req.query;

  if (serviceSid && transcriptSid) {
    const transcriptViewerAssetUrl = process.env.TRANSCRIPT_VIEWER_ASSET_URL;
    const token = await client.getTranscriptViewerToken(serviceSid, transcriptSid);
    const url = `${transcriptViewerAssetUrl}?token=${token}`;

    return res.writeHead(302, { Location: url }).end();
  }

  // Basic fallback for errors (can customize)
  return res.status(400).json({ error: "Missing serviceSid or transcriptSid" });
}