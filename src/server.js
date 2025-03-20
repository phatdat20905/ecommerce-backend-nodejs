import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Cấu hình CORS chi tiết
const corsOptions = {
  origin: process.env.REACT_URL || 'http://localhost:3000', // Chỉ cho phép frontend từ localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers được phép
  credentials: true // Cho phép gửi cookie hoặc thông tin xác thực
};

app.use(cors(corsOptions));

// Middleware body parsing
app.use(express.json({limit: '50mb'})); // Parse JSON body
app.use(express.urlencoded({limit: '50mb', extended: true })); // Parse URL-encoded body


app.get('/', (req, res) => {
  res.send('Welcome to E-commerce Backend!');
});

apiRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});