const Shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const Range = (len) => {
  return [...Array(len).keys()];
};

const CircularIndex = (index, len) => {
  const new_index = ((index % len) + len) % len;
  return new_index;
};

export { Shuffle, Range, CircularIndex };
