export const expressInThousands = (num: number): string => {
  let rem = num.toFixed(0).length % 3;
  let start = rem;
  let end = Math.floor(num.toFixed(0).length / 3);
  let result = num.toFixed(0).substring(0, rem);
  for (let i = 0; i < end; i++) {
    result = `${result}${rem > 0 || i > 0 ? "," : ""}${num
      .toFixed(0)
      .substring(start, start + 3)}`;
    start += 3;
  }
  return result;
};

export const expressThousandsInZeroGroup = (text: string): string => {
  const separatedTextArray = text.split(",");
  const zeroGroupTail = separatedTextArray.slice(1);

  let generatedText = "";

  switch (zeroGroupTail.length) {
    case 0:
      generatedText = "";
      break;
    case 1:
      generatedText = `,${zeroGroupTail[0]}`;
      break;
    case 2:
      generatedText = `.${zeroGroupTail[0]} M`;
      break;
    case 3:
      generatedText = `.${zeroGroupTail[0]} B`;
      break;
    case 4:
      generatedText = `.${zeroGroupTail[0]} T`;
      break;
    default:
      generatedText = `.${zeroGroupTail[0]} >> T`;
  }

  return `${separatedTextArray[0]}${generatedText}`;
};
