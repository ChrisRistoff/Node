import fs from 'fs/promises';

const template = await fs.readFile(new URL('./index.html', import.meta.url), 'utf8');

const data = {
  title: 'going deep',
  body: 'this is the final html',
};
 
const html = template.replace('{title}', data.title).replace('{body}', data.body);

await fs.writeFile(new URL('./index2.html', import.meta.url), html);
console.log('done');

const newHtml = await fs.readFile(new URL('./index2.html', import.meta.url), 'utf8');
console.log(newHtml); 
