import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";

// import routes
import userRoutes from './routes/userRoutes.js';
import personRoutes from './routes/personRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// check api
app.get('/test', (req, res) => {
  res.send('Api Connected Awesome');
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/person', personRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/:mediaType', mediaRoutes);

// create server with http module
const server = http.createServer(app);
const port = process.env.PORT || 5500;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('==== Connected To MongoDB ====');
  server.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
  });
}).catch((error) => {
  console.log({ error });
  process.exit(1);
});