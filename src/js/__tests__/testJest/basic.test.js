import { masterCard } from '../../utils';
import Inspector from '../../Inspector';

test('Объект должен возвращать число', () => {
  const result = masterCard.checkStart(222100);
  expect(result).toBe(222100);
});

test('Объект должен не возвращать число', () => {
  const result = masterCard.checkStart(222099);
  expect(result).toBe(undefined);
});

test('Объект должен возвращать массив. Номер карты валидный', () => {
  const result = new Inspector('4242123456784');
  expect(result.getNumberCardSplit()).toEqual([4, 2, 4, 2, 1, 2, 3, 4, 5, 6, 7, 8, 4]);
});

// test('Объект не должен возвращать массив. Номер карты невалидный', () => {
//   const result = new Inspector('42e2123456784');
//   expect(result.getNumberCardSplit()).toBe(undefined);
// });

test('Объект должен возвращать число', () => {
  const result = new Inspector('4242123456784');
  expect(result.checkSum()).toBe('4');
});

test('Объект должен возвращать число', () => {
  const result = new Inspector('4556737586899855');
  expect(result.luna()).toBe(5);
});
