import FileManager from './src/FileManager.js';
import { getUsernameArgument } from './src/utils/utils.js';

const username = getUsernameArgument();
const fileManager = new FileManager(username);

process.stdin.on('data', async (data) => {
  process.stdin.pause();

  await fileManager.execCommand(data).catch((error) => console.error(error));

  process.stdin.resume();
});

process.on('SIGINT', () => {
  fileManager.showGoodbye();
  process.exit();
});
