import {
  visa, visaCard, masterCard, masterCardCard, maestro, maestroCard, mir, mirCard, cards,
} from './utils';

export default class Inspector {
  constructor(numberCard) {
    this.numberCard = numberCard;
    this.numberCardResult = this.getNumberCardSplit();
  }

  getNumberCardSplit() {
    const arr = this.numberCard.split('').map((a) => Number(a));
    for (let i = 0; i < arr.length; i += 1) {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(arr[i])) {
        document.querySelector('.form').reset();
        this.numberCard = undefined;
        alert('Введите номер карты');
        return undefined;
      }
    }
    return arr;
  }

  checkSum() {
    if (this.numberCardResult) {
      return this.numberCard[this.numberCard.length - 1];
    }
    return undefined;
  }

  luna() {
    if (!this.numberCardResult) return undefined;
    const arr = this.numberCardResult;

    arr.splice(this.numberCardResult.length - 1, 1);
    arr.reverse();

    for (let i = 0; i < arr.length; i += 1) {
      if (!(i % 2)) {
        arr[i] *= 2;
        if (arr[i] > 9) arr[i] -= 9;
      }
    }
    const total = arr.reduce((a, b) => a + b);
    return total % 10;
  }

  checkCard() {
    if (!this.numberCardResult) return undefined;

    const numberCardResultStr = this.numberCardResult.join('');
    if (this.numberCardResult[0] === 4 && (visa.length
      .find((a) => a === this.numberCardResult.length))) {
      visaCard.closest('.item').classList.remove('hidden');
    } else
    if (masterCard.length === this.numberCardResult.length
       && (masterCard.startsWith.find((a) => a === Number(numberCardResultStr.substring(0, 2)))
       || masterCard.checkStart(Number(numberCardResultStr.substring(0, 6))))
    ) {
      masterCardCard.closest('.item').classList.remove('hidden');
    } else

    if (maestro.length.find((a) => a === this.numberCardResult.length)
    && maestro.startsWith.find((a) => a === Number(numberCardResultStr.substring(0, 4)))
    ) {
      maestroCard.closest('.item').classList.remove('hidden');
    } else

    if (mir.startsWith === Number(numberCardResultStr.substring(0, 4))
    && mir.length === this.numberCardResult.length
    ) {
      mirCard.closest('.item').classList.remove('hidden');
    }

    return undefined;
  }

  clearList() {
    console.log(this.numberCard);
    cards.forEach((a) => {
      if (!a.classList.contains('hidden')) {
        a.classList.add('hidden');
      }
    });
  }
}
