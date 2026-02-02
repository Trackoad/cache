import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

const app = express();

app.use((req, res, next) => {
  console.log('in', req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.header('CDN-Cache-Control', `max-age=${15 * 60}`);
  res.header('Cache-Control', `max-age=${15 * 60}`);
  res.header('Cache-Tag', 'test,huitre');

  res.json({ ok: true });
});

app.get('/purge/:tag', async (req, res) => {
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/purge_cache`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
    },
    body: JSON.stringify({
      tags: [req.params.tag],
    }),
  });

  const content = await response.json();

  res.json({ ok: true, content });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('listen on http://localhost:' + (process.env.PORT || 8080));
});
