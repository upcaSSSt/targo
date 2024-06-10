const { readFileSync, writeFileSync, unlinkSync } = require('node:fs');
const { join } = require('node:path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const HOST = 'http://localhost';
const PORT = 3000;

const app = express();

const products = JSON.parse(readFileSync('db.json'));

app.use(cors());

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join('src', 'assets'));
    },
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      cb(null, file.originalname);
    },
  }),
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.listen(PORT, () => console.log(`App is listening on ${HOST}:${PORT}`));

app.get('/', (req, res) => {
  res.json(products);
});

app.post('/addFile', upload.single('img'), (req, res) => {
  res.send('Добавил файл');
});

app.post('/delFile', (req, res) => {
  unlinkSync(join('src', 'assets', req.body.name));
  res.send('Удалил файл');
});

app.post('/add', upload.single('img'), (req, res) => {
  const { name, price, description } = req.body;
  products.push({
    imgName: req.file.filename, name, price: +price, description, orders: [{ date: new Date().toISOString().slice(0, -14), n: 1 }],
  });
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Добавил');
});

app.post('/edit', upload.single('img'), (req, res) => {
  for (const index of req.body.edits)
    for (const field of req.body.edits[index])
      products[index][field] = req.body.edits[index][field];
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Редактировал');
});

app.post('/del', (req, res) => {
  unlinkSync(join('src', 'assets', products[req.body.index].imgName));
  products.splice(req.body.index, 1);
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Удалил');
});

app.post('/order', (req, res) => {
  for (const newOrder of req.body.newOrders)
    if (products[newOrder.index].orders.at(-1).date === req.body.now)
      products[newOrder.index].orders.at(-1).n = newOrder.n;
    else
      products[newOrder.index].orders.push({ date: req.body.now, n: newOrder.n });

  writeFileSync('db.json', JSON.stringify(products));
  res.send('Заказал');
});
