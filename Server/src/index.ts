import { app } from './app';

async function startServer() {
  try {
    await app.listen({ port: Bun.env.PORT, host: '0.0.0.0' }, (_, address) => {
      console.info(`Server listening on ${address}`);
    });
  } catch (error) {
    console.error(`An error occurred while starting the server: ${error}`);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  try {
    await app.close();
    console.info('\nServer closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error(`An error occurred while closing the server: ${error}`);
    process.exit(1);
  }
});

startServer();
