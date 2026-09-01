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
  if (shuttingDown) return;
  shuttingDown = true;

  console.info('\nClosing server gracefully...');

  const forceShutdown = setTimeout(() => {
    console.error('Server close forcefully');
    process.exit(1);
  }, 20000);
  forceShutdown.unref();

  try {
    await app.close();
    console.info('Server closed gracefully');
    clearTimeout(forceShutdown);
    process.exit(0);
  } catch (error) {
    console.error(`An error occurred while closing the server: ${error}`);
    clearTimeout(forceShutdown);
    process.exit(1);
  }
});

startServer();
