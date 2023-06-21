#!/usr/bin/env node
// ^ this is a shebang line, it tells the terminal what to do with this file
// in this case, it tells the terminal to run this file with node (node index.js)

import fetch from "node-fetch";
import open from "open";
import yargs from "yargs";

const{ argv } = yargs(process.argv);

// it's a json object, it will contain the data from the reddit api
// it will be an array of objects, each object will contain the data of a post
const res = await fetch("https://www.reddit.com/r/learnprogramming/.json");

const data = await res.json();
const children = data.data.children;
const randomPost = children[Math.floor(Math.random() * children.length)];
const link = `https://www.reddit.com${randomPost.data.permalink}`;

// argv.print is a boolean, if it is true, it will print the title and link in the terminal
// if it is false, it will open the link in the browser
// it will be false by default if no argument is passed in the terminal
// to make it true, type in the terminal: reddit --print or reddit -p
// it will print the title and link in the terminal
if (argv.print || argv.p) {
  console.log(randomPost.data.title);
  console.log(link);
  } else {
  console.log(`Opening ${randomPost.data.title} post in the browser...`);
  // this will open the link in the default browser if the --print argument is not passed
  open(link);
}
// to run this file, type in the terminal:
// npm install -g
// then type: reddit as specified in the package.json file
