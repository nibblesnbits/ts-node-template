import app from './app';
import { AppDataSource } from './lib/db';
import routes from './routes/index';

for (const route of routes) {
  route(app);
}

AppDataSource.initialize().then(() => {
  console.log('📈 Database connected!');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}!`);
  });
});

process.on('SIGINT', () => {
  console.log('Caught interrupt signal.  Exiting. 💌');

  process.exit();
});
