const express = require('express');
const clarisse = require('./index');

const app = express();
app.use(
  '/static',
  express.static('static', {
    maxAge: 60 * 1000
  })
);

const resultMap = new Map(); // { [IPAdress: string]: boolean }
let lastRequest = 0; // 最後に API を使った Unix epoc [ms]

app.get('/index.js', async (req, res) => {
  try {
    let isKagawa = resultMap.get(req.ip); // メモリキャッシュを利用

    // 2requests/sec の制限に引っかかりそうな場合は false と判定
    if (isKagawa === undefined && lastRequest + 500 > Date.now()) {
      isKagawa = false;
    }

    // IP Geocoding を実行
    if (isKagawa === undefined) {
      const regionName = await clarisse.getRegionName(req.ip);
      console.log('from', regionName);
      isKagawa = regionName === 'Kagawa';
      resultMap.set(req.ip, isKagawa);
      lastRequest = Date.now();
    }

    // 県外からアクセスしている場合は結果を１時間キャッシュさせる
    res.set('Cache-Content', isKagawa ? 'no-cache' : 'private, max-age=3600');

    if (isKagawa) {
      // 香川県からアクセスしている場合は js を読み込む
      return res.redirect(301, '/static/kagawa.js');
    }
  } catch (error) {
    console.error(error);
  }
  // 何もしない
  res.status(200).send('');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
