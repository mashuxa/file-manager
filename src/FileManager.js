import { resolve, parse } from 'path';
import messages from './constants/messages.js';
import commands from './constants/commands.js';
import { formatInput } from './utils/utils.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';
import add from './commands/add.js';
import rn from './commands/rn.js';
import cp from './commands/cp.js';
import rm from './commands/rm.js';
import os from './commands/os.js';
import hash from './commands/hash.js';
import compress from './commands/compress.js';
import decompress from './commands/decompress.js';
import { InputError, ERROR_INVALID_INPUT, errorMessages } from './InputError.js';

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

  async execCommand(input) {
    try {
      const [command, argument1, argument2] = formatInput(input);

      switch (command) {
        case commands.up:
          const { root } = parse(this._currentDirectory);

          if(this._currentDirectory !== root) {
            const parentDirectory = resolve(this._currentDirectory, '../');

            this.changeDirectory(parentDirectory);
          }

          break;

        case commands.cd:
          if (!argument1) {
            throw new InputError();
          }

          const directory = resolve(argument1);

          this.changeDirectory(directory);

          break;

        case commands.ls:
          await ls();

          break;

        case commands.cat:
          await cat(argument1);

          break;

        case commands.add:
          await add(argument1);

          break;

        case commands.rn:
          await rn(argument1, argument2);

          break;

        case commands.cp:
          await cp(argument1, argument2);

          break;

        case commands.mv:
          await cp(argument1, argument2);
          await rm(argument1);

          break;

        case commands.rm:
          await rm(argument1);

          break;

        case commands.os:
          const data = await os(argument1?.replace('--', ''));

          console.log(data);

          break;

        case commands.hash:
          await hash(argument1);

          break;

        case commands.compress:
          await compress(argument1, argument2);

          break;

        case commands.decompress:
          await decompress(argument1, argument2);

          break;

        case commands.exit:
          this.showGoodbye();
          process.exit();

          break;

        default:
          throw new InputError();
      }
    } catch (error) {
      switch (error.code) {
        case ERROR_INVALID_INPUT:
          throw errorMessages.invalidInput;

          break;

        default:
          throw errorMessages.operationFailed;
      }
    }

    this.showCurrentDirectory();
  }
}