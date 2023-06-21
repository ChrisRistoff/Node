import { readFile } from 'fs';


readFile(new URL('./file.txt', import.meta.url), 'utf8'), (err, data) => {
  if (err) {
    console.log(err); // to log the error
    throw err; // to throw the error and stop the program
  } else {
    console.log(data);
  }
};


import { readFile } from 'fs/promises';

// promise version of the above code (using async/await)
try {
  readFile(new URL('./file.txt', import.meta.url), 'utf8')
} catch (err) {
  console.log(err); // to log the error
  throw err; // to throw the error and stop the program
}


// don't use this in production code because it's not safe
// it's just to show how to use the uncaughtException event
// process is a global object in Node.js that provides information about,
// and control over, the current Node.js process
// process.on() is used to register listeners, and the uncaughtException event is
// emitted when an uncaught JavaScript exception bubbles all the way back to the event loop
// the listener function is invoked with the error object
// as the first argument and can be used to handle the error
process.on('uncaughtException', (err) => {
  console.log(err);
});
