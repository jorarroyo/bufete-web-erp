import React from 'react';
import { TextField } from '@material-ui/core';

const TimeInput = props => {
  const { value, setValue } = props;

  const onChange = event => {
    setValue(event);
  };

  const getSecondsFromHHMMSS = value => {
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

  const toHHMMSS = secs => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map(val => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== '00' || index > 0)
      .join(':')
      .replace(/^0/, '');
  };

  const onBlur = event => {
    const { value } = event.target;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    const time = toHHMMSS(seconds);
    setValue({ target: { name: event.target.name, type: event.target.type, value: time } });
  };

  return <TextField {...props} onChange={onChange} onBlur={onBlur} value={value}/>;
};

export default TimeInput;
