import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use((req, res, next) => {
  console.log('in', req.originalUrl);
  next();
});

app.get('/', (req, res) => {

  res.header('CDN-Cache-Control', `max-age=${15}`);
  res.header('Cache-Control', `max-age=${15}`);

  res.json({ ok: true });
});


app.listen(process.env.PORT || 8080, () => {
  console.log('listen on http://localhost:' + (process.env.PORT || 8080));
  
})