const client = require('./twilioClient');

export default async function handler(req, res) {
  const transcriptViewerEmbeddedUrl = process.env.TRANSCRIPT_VIEWER_EMBEDDED_URL;
  const transcriptsAssetUrl = process.env.TRANSCRIPTS_ASSET_URL;

  const viewLink = encodeURIComponent(`${transcriptViewerEmbeddedUrl}`);
  const token = await client.getTranscriptsToken(viewLink);
  const iframeUrl = `${transcriptsAssetUrl}?token=${token}`;

  // Instead of rendering EJS, return JSON or raw HTML string for iframe embed
  res.status(200).json({ iframeUrl });
}
