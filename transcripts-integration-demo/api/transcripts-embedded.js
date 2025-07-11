const client = require('./twilioClient');

export default async function handler(req, res) {
  const transcriptViewerEmbeddedUrl = process.env.TRANSCRIPT_VIEWER_EMBEDDED_URL;
  const transcriptsAssetUrl = process.env.TRANSCRIPTS_ASSET_URL;

  const viewLink = encodeURIComponent(`${transcriptViewerEmbeddedUrl}?serviceSid=GA71776b2c22c2f6821e2044256d77f3ca&transcriptSid=GT5b2a576526d230d217af879c9ad5fd07`);
  const token = await client.getTranscriptsToken(viewLink);
  const iframeUrl = `${transcriptsAssetUrl}?token=${token}`;

  // Instead of rendering EJS, return JSON or raw HTML string for iframe embed
  res.status(200).json({ iframeUrl });
}
