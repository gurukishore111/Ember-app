const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const UserRouter = require('./routes/userRoutes');
const AuthRouter = require('./routes/authRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const registerRouter = require('./routes/registerRoutes');

dotenv.config();
connectDb();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hi Iam here......');
});

app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/registers', registerRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
