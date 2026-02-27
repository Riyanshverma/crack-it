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

let shuttingDown = false;

process.on('SIGINT', async () => {
  try {
    if (shuttingDown) return
    shuttingDown = true;

    console.info('\nClosing server gracefully...');
    await app.close();
    console.info('Server closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error(`An error occurred while closing the server: ${error}`);
    process.exit(1);
  }
});

startServer();
