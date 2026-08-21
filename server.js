const express = require('express');
const path = require('path');

const app = express();

app.use(express.json({ limit: '10mb' }));

// Пока временное хранилище.
// Следующим этапом подключим нормальную постоянную БД.
let writeoffs = [];

// Проверка работы сервера
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Usadba 2.0'
  });
});

// Получить списания
app.get('/api/writeoffs', (req, res) => {
  res.json(writeoffs);
});

// Создать списание
app.post('/api/writeoffs', (req, res) => {
  const item = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };

  writeoffs.unshift(item);

  res.status(201).json(item);
});

// Файлы интерфейса сейчас лежат прямо в корне GitHub
app.use(express.static(__dirname));

// Главная страница приложения
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Render сам передаст PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Usadba 2.0 running on ${port}`);
});
