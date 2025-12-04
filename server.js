const express = require('express');
const app = express();


function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/noutbuki', (req, res) => {
  res.sendFile(__dirname + '/catalog.html');
});


app.get('/noutbuki/:category/:productSlug', (req, res) => {
  const { category, productSlug } = req.params;
  
  
  const product = findProductBySlug(productSlug);
  
  if (product) {
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${product.name} - купить за ${product.price} руб.</title>
        <meta name="description" content="${product.description}">
        <meta property="og:title" content="${product.name}">
      </head>
      <body>
        <h1>${product.name}</h1>
        <p>Цена: ${product.price} руб.</p>
      </body>
      </html>
    `);
  } else {
    res.status(404).send('Товар не найден');
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});