const client = require('./twilioClient');

export default async function handler(req, res) {
  const { serviceSid, transcriptSid } = req.query;
  const iframeBaseUrl = process.env.TRANSCRIPTS_ASSET_URL;
  const appBaseUrl = process.env.APP_BASE_URL; // your deployed app domain, e.g. https://your-app.vercel.app

  if (serviceSid && transcriptSid) {
    const viewLink = `${appBaseUrl}/api/transcript-viewer-standalone?serviceSid=${serviceSid}&transcriptSid=${transcriptSid}`;
    const transcriptViewerAssetUrl = process.env.TRANSCRIPT_VIEWER_ASSET_URL;
    const token = await client.getTranscriptsTokenFromViewLink(viewLink); // const token = await client.getTranscriptViewerToken(serviceSid, transcriptSid);
    const iframeUrl = `${iframeBaseUrl}?token=${token}`;

    res.status(200).json({ iframeUrl });
    //const url = `${transcriptViewerAssetUrl}?token=${token}`;

    //return res.writeHead(302, { Location: url }).end();
  }

  // Basic fallback for errors (can customize)
  return res.status(400).json({ error: "Missing serviceSid or transcriptSid" });
}
