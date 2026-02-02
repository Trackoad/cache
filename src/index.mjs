import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.get('/', (req, res) => {
  console.log(req.originalUrl, 'data');
  res.json({ ok: true });
});


app.listen(process.env.PORT || 8080, () => {
  console.log('listen on http://localhost:' + (process.env.PORT || 8080));
  
})