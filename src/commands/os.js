import { arch, cpus, EOL, homedir, hostname } from 'os';
import OSarguments from '../constants/OSarguments.js';
import messages from '../constants/messages.js';
import { InputError } from '../InputError.js';

export default async (argument) => {
  switch (argument) {
    case OSarguments.eol:
      return JSON.stringify(EOL);

    case OSarguments.cpus:
      const cpusData = cpus().map(({ model, speed }) => ({
        model,
        speed: `${speed/1000}GHz`
      }));

      return { amount: cpusData.length, cpusData };

    case OSarguments.homedir:
      return homedir();

    case OSarguments.username:
      return hostname();

    case OSarguments.architecture:
      return arch();

    default:
      throw new InputError();
  }
};