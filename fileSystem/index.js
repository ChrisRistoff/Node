const fs = require('fs');


const datafun = () => {
  let data = fs.readFileSync('./file.txt', 'utf8');
  let dataArray = data.replace(/,/g, "")
  dataArray = dataArray.split(" ");
  return dataArray;
}

let theData = datafun().sort();
console.log(theData);

const countWords = (theData) => {
  let count = 0;

  for (item of theData) {
    count ++;
  }

  return count;
}

console.log(countWords(theData));

const countUniqueWords = (theData) => {
  let count = 0;
  let uniqueWords = [];

  for (item of theData) {
    if (!uniqueWords.includes(item)) {
      uniqueWords.push(item);
      count ++;
    }
  }

  return count;
}

console.log(countUniqueWords(theData));

let binarySearch = (theData, word) => {
  let start = 0;
  let end = theData.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (theData[middle] === word) {
      return middle;
    } else if (theData[middle] < word) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return -1;
}


console.log(theData[binarySearch(theData, "Bulgaria")]);
