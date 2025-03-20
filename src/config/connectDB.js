import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log, // Hiển thị các truy vấn SQL (tắt bằng false khi production)
    pool: {
      max: 5, // Số kết nối tối đa
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Kiểm tra kết nối
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL with Sequelize');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connection;