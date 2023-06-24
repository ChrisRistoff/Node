import { add } from './app.mjs';

// test with assert
import assert from 'assert';

console.log(`add()\n Should add two numbers`);

try {
  assert.strictEqual(add(1, 2), 3);
  console.log(`✅ add() passed`);
} catch (err) {
  console.log(`❌ add() failed: ${err.message}`);
}
