import messages from './constants/messages.js';
import commands from './constants/commands.js';
import { formatCommand } from './utils/utils.js';

export default class {
  constructor(username = 'user') {
    this._username = username;
    this._currentDirectory = null;

    this.showGreeting();
    this.changeDirectory(process.env.HOME);
    this.showCurrentDirectory();
  }

  changeDirectory(directory) {
    process.chdir(directory);
    this._currentDirectory = directory;
  }

  showCurrentDirectory() {
    const message = messages.currentDirectory.replace('currentDirectory', this._currentDirectory);

    console.log(message);
  }

  showGreeting() {
    const message = messages.greeting.replace('username', this._username);

    console.log(message);
  }

  showGoodbye() {
    const message = messages.goodbye.replace('username', this._username);

    console.log(message);
  }

  async execCommand(command) {
    const formattedCommand = formatCommand(command);

    if (!command.hasOwnProperty(formattedCommand[0])) {
      throw new Error(messages.invalidInput);
    }

    try {
      switch(formattedCommand[0]) {
        case commands.up:
          break;
        case commands.cd:
          break;
        case commands.ls:
          break;
        case commands.cat:
          break;
        case commands.add:
          break;
        case commands.rn:
          break;
        case commands.cp:
          break;
        case commands.mv:
          break;
        case commands.rm:
          break;
        case commands.os:
          break;
        case commands.hash:
          break;
        case commands.compress:
          break;
        case commands.decompress:
          break;
      }

      this.showCurrentDirectory();
    } catch (e) {
      throw new Error(messages.operationFailed);
    }
  }
}