import path from 'path';
import messages from '../constants/messages.js';
import { InputError } from '../InputError.js';

const USERNAME_KEY = '--username=';
const USERNAME_DEFAULT = 'user';
const REGEXP_INPUT = /^\s*(\.?[a-z]+)(\s+|$)(('[^']+')|("[^"]+")|([^\s]+))?(\s+|$)(('[^']+')|("[^"]+")|([^\s]+))?(\s+|$)/gm;
const REGEXP_QUOTES = /^('.+')|(".+")$/gm;

export const getUsernameArgument = () => {
  const args = process.argv.slice(2);
  const username = args.find((value) => value.startsWith(USERNAME_KEY))?.replace(USERNAME_KEY, '');

  return username || USERNAME_DEFAULT;
};

const removeQuotes = (arg) => REGEXP_QUOTES.test(arg) ? arg.slice(1, -1) : arg;

export const formatInput = (input) => {
  const [result] = [...input.toString().matchAll(REGEXP_INPUT)];

  if (!result) {
    throw new InputError();
  }

  return [result[1], removeQuotes(result[3]), removeQuotes(result[8])];
};

export const sortFileData = ([a], [b]) => a.toLowerCase() > b.toLowerCase() ? 1 : -1;