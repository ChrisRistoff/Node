#!/usr/bin/env node

import * as fs from 'fs';

// Define the path to the package.json file
const packageJsonPath = './package.json';

// Read the package.json file
const packageJsonBuffer = fs.readFileSync(packageJsonPath);
const packageJson = JSON.parse(packageJsonBuffer.toString());

// Get the dependencies section
const dependencies = packageJson.dependencies || {};

// Display the dependencies
console.log('Dependencies:');
for (const packageName in dependencies) {
  console.log(`${packageName}: ${dependencies[packageName]}`);
}
