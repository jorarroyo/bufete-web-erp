const yearList = startYear => {
  const currentYear = new Date().getFullYear();
  const years = [];
  let newStartYear = startYear || 2000;
  while (newStartYear <= currentYear) {
    years.push(newStartYear++);
  }
  return years;
};

const formatDate = date => {
  if (!date) return null;
  const today = new Date(date);
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}/${mm}/${yyyy}`;
};

const reFormatDate = date => {
  if (!date) return null;
  const today = new Date(date);
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}/${mm}/${dd}`;
};

const calcDateDiff = totalMin => {
  if (!totalMin || totalMin <= 0) {
    return '00:00';
  }
  const hours = ~~(totalMin / 60);
  const minutes = totalMin % 60;
  return `${hours}:${minutes !== 0 ? minutes : '00'}`;
};

const timeConvert = n => {
  if (!n || n <= 0) {
    return '00:00';
  }
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}:${rminutes !== 0 ? `0${rminutes}`.slice(-2) : '00'}`;
};

const numberFormat = (locale, style, currency, value) =>
  new Intl.NumberFormat(locale, {
    style,
    currency,
  }).format(value);

const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};

const base64ToArrayBuffer = base64 => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const formatNumber2 = num => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return Number(num).toLocaleString('en', options);
};

const getMinutesFromHHMMSS = value => {
  const [str1, str2] = value.split(':');

  const val1 = Number(str1);
  const val2 = Number(str2);

  if (!isNaN(val1) && isNaN(val2)) {
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2)) {
    return val1 * 60 + val2;
  }

  return 0;
};

const helperFunctions = {
  yearList,
  formatDate,
  reFormatDate,
  calcDateDiff,
  numberFormat,
  compareValues,
  timeConvert,
  base64ToArrayBuffer,
  formatNumber2,
  getMinutesFromHHMMSS,
};

export default helperFunctions;
