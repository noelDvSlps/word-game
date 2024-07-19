export default function deleteLetters(index, word) {
  const arrayWord = [...word];

  for (let i = index; i < arrayWord.length; i++) {
    arrayWord[i] = " ";
  }
  return arrayToWord(arrayWord);
}

export function arrayToWord(arrayOfLetters) {
  let wordFromArray = "";
  const arrayLength = arrayOfLetters.length;

  for (let i = 0; i < arrayLength; i++) {
    wordFromArray = wordFromArray + arrayOfLetters[i];
  }

  return wordFromArray;
}
