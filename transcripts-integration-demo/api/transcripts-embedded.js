const client = require('./twilioClient');

export default async function handler(req, res) {
  const serviceSid = req.query.serviceSid;
  const transcriptSid = req.query.transcriptSid;
  const transcriptViewerEmbeddedUrl = process.env.TRANSCRIPT_VIEWER_EMBEDDED_URL;
  const transcriptsAssetUrl = process.env.TRANSCRIPTS_ASSET_URL;
  const appBase = process.env.APP_BASE_URL;

  const viewLink = `${appBase}/api/transcript-viewer-standalone?serviceSid=${serviceSid}&transcriptSid=${transcriptSid}`;
  const token = await client.getTranscriptsToken(viewLink);
  const iframeUrl = `${transcriptsAssetUrl}?token=${token}`;

  // Instead of rendering EJS, return JSON or raw HTML string for iframe embed
  res.status(200).json({ iframeUrl });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate embedded token' });
  }
}
