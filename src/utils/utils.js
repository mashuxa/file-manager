export const getUsernameArgument = (args) => {
 const [,username] = args.splice(2).find((value) => value.startsWith('--username=')).split('=');

 return username;
};

export const formatCommand = (command) => command.toString().replace(/\s+/g, ' ').trim().split(' ');