export const letterToNumber = (letter: string) => {
  if (!letter) return 0;
  const letterLowerCase = letter.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const index = alphabet.indexOf(letterLowerCase);
  if (index === -1) {
    return 3;
  }
  return index % 4;
};
