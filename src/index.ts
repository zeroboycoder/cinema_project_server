import { createServer } from 'http'
import app from './app';
import { sequelize } from './models/index'

(async () => {
  try {
    const server = createServer(app);
    const PORT = process.env.PORT || 8000;
    await sequelize.sync({ alter: true });
    console.log("DB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  } catch (error) {
    console.log("error => ", error)
  }
})()
