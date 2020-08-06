import {getRandomInteger} from './utils';
import {getRundomIndex} from './utils';
import {generateDate} from './utils';
import {generateRepeating} from './utils';
import {DESCRIPTIONS, COLORS} from './const';

export const generateTask = () => {
  const dueDate = generateDate();
  const description = getRundomIndex(DESCRIPTIONS);
  const color = getRundomIndex(COLORS);
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

  return {
    description,
    dueDate,
    repeating,
    color,
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
