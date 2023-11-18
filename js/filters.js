import { createThumbnails } from './thumbnails.js';

const filter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');
const currentButton = filterForm.querySelector('.img-filters__button--active');
const pictures = document.querySelectorAll('.picture');

const MAX_RANDOM_FILTER = 10;

const filterGroup = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (max, min) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filterGroup.DEFAULT]: (data) => data,
  [filterGroup.RANDOM]: (data) => {
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    const randomList = [];
    while (randomList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomList.includes(index)) {
        randomList.push(index);
      }
    }
    return randomList.map((index) => data[index]);
  },
  [filterGroup.DISCUSSED]: (data) => [...data].sort((a, b) => (a.comments.length - b.comments.length)),
};

//функция отрисовки отфильтрованных

const remake = (event, filterElement, data) => {
  pictures.forEach((element) => element.remove());
  const filteredData = filterHandlers[filterElement](data);
  createThumbnails(filteredData);
  currentButton.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};


const showFilter = (data) => {
  filter.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (event) => {
    remake(event, filterGroup.DEFAULT, data);
  });
  randomButton.addEventListener('click', (event) => {
    remake(event, filterGroup.RANDOM, data);
  });
  discussedButton.addEventListener('click', (event) => {
    remake(event, filterGroup.DISCUSSED, data);
  });
};

export { showFilter };
