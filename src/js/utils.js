export const visa = {
  startsWith: 4,
  length: [13, 16, 19],
};

export const masterCard = {
  startsWith: [51, 52, 53, 54, 55],
  checkStart(num) {
    if (num >= 222100 && num <= 272099) {
      return num;
    }
    return undefined;
  },
  length: 16,
};

export const maestro = {
  startsWith: [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
  length: [16, 17, 18, 19],
};

export const mir = {
  startsWith: 2202,
  length: 16,
};

export const cards = Array.from(document.querySelectorAll('.item'));
export const visaCard = document.getElementById('visa');
export const masterCardCard = document.getElementById('mastercard');
export const maestroCard = document.getElementById('maestro');
export const mirCard = document.getElementById('mir');

export function getNumberCard() {
  return document.querySelector('.field').value;
}
