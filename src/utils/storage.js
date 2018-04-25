import debounce from 'debounce';

const KEY = 'data';

const omitKeys = [
  'forms',
];

export const save = getState => {
  const work = () => {
    const data = {};
    const state = getState();

    Object.keys(state).forEach(key => {
      if (omitKeys.includes(key)) {
        return;
      }
      data[key] = state[key];
    });

    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (err) {
      // for iphone\ipad in private mode
      // eslint-disable-next-line no-undef
      if (typeof QuotaExceededError !== 'undefined' && err instanceof QuotaExceededError) {
        // eslint-disable-next-line no-console
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  return debounce(work);
};

export const load = () => {
  try {
    const data = localStorage.getItem(KEY);

    if (!data) {
      return;
    }

    return JSON.parse(data);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return undefined;
  }
};
