const client = require('./twilioClient');

export default async function handler(req, res) {
  const transcriptViewerEmbeddedUrl = process.env.TRANSCRIPT_VIEWER_EMBEDDED_URL;
  const transcriptsAssetUrl = process.env.TRANSCRIPTS_ASSET_URL;

  const viewLink = encodeURIComponent(`${transcriptViewerEmbeddedUrl}?serviceSid=RE91e7dfed2cb7b0ea06da85ed9c33f55c&transcriptSid=GT5b2a576526d230d217af879c9ad5fd07`);
  const token = await client.getTranscriptsToken(viewLink);
  const url = `${transcriptsAssetUrl}?token=${token}`;

  return res.writeHead(302, { Location: url }).end();
}
