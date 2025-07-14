const client = require('./twilioClient');

export default async function handler(req, res) {
  const viewerUrl = process.env.TRANSCRIPTS_ASSET_URL;

  try {
    const token = await client.getTranscriptsTokenWithViewerRedirect();
    const iframeUrl = `${viewerUrl}?token=${token}`;
    res.status(200).json({ iframeUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not generate transcript list viewer' });
  }
}
