import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './src/route/index';

const app = express();
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: '*/octet-stream' }));

app.get('/', (req, res) => res.status(200).send('<h1 style="color: blue;">Express Server Setup!</h1><p>Welcome home!</p>'));
app.use('/api/v1/', routes);

app.all('*', (req, res) => {
  res.status(404).json({ status: 404, msg: 'NOT FOUND' });
});
export default app;
