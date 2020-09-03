import {
  getRandomInteger,
  getRandomElement,
  getRandomBoolean
} from '../utils/common.js';

import {DESCRIPTIONS, COLORS} from '../const.js';

// deadLine date
const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

// repeat days
const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  };
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateTask = () => {
  const dueDate = generateDate();
  const description = getRandomElement(DESCRIPTIONS);
  const color = getRandomElement(COLORS);
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
    id: generateId(),
    description,
    dueDate,
    repeating,
    color,
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};
