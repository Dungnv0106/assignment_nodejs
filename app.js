import express from 'express';
import routerProduct from './routers/pro_router';
import routerAuth from './routers/auth';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/we17309');

app.use('/api', routerProduct);
app.use('/api', routerAuth);

app.listen(4000, () => {
    console.log('Server running port on 4000');
});