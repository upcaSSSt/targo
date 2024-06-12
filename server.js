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
  products[req.body.id] = {
    imgName: req.file.filename,
    name: req.body.name,
    price: +req.body.price,
    description: req.body.description,
    orders: [],
  };
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Добавил');
});

app.post('/edit', upload.single('img'), (req, res) => {
  for (const id in req.body.edits)
    for (const field in req.body.edits[id])
      products[id][field] = req.body.edits[id][field];
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Редактировал');
});

app.post('/del', (req, res) => {
  unlinkSync(join('src', 'assets', products[req.body.id].imgName));
  delete products[req.body.id];
  writeFileSync('db.json', JSON.stringify(products));
  res.send('Удалил');
});

app.post('/order', (req, res) => {
  for (const id in req.body.newOrders)
    if (products[id].orders.length < 1 || products[id].orders.at(-1).date < req.body.now)
      products[id].orders.push({ date: req.body.now, n: req.body.newOrders[id] });
    else
      products[id].orders.at(-1).n = req.body.newOrders[id];

  writeFileSync('db.json', JSON.stringify(products));
  res.send('Заказал');
});
