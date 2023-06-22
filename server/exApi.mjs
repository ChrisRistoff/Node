import express from 'express';
import bp from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(morgan('dev'));

const db = [];

app.post('/todo' , (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
  };
  db.push(todo);
  res.send({ todo });
});

app.get('/todos', (_, res) => {
  const todos = db;
  res.json({ todos });
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
