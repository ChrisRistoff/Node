#!/usr/bin/env node

import open from 'open';
import querystring from 'querystring';

const searchQuery = process.argv.slice(2).join(' ');
const encodedQuery = querystring.escape(searchQuery);
const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;

open(searchUrl);
