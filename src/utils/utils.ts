// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    // eslint-disable-next-line no-console
    console.log('parsing error on', { value });
    return undefined;
  }
}

export const generateId = (length: number): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const putLeadingZero = (num: number, size: number): string => {
  let numStr = num.toString();
  while (numStr.length < size) numStr = `0${numStr}`;
  return numStr;
};

type Time = {
  miliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
};

export const getTime = (mcs: number): Time => {
  const time = mcs / 1000;

  const hours = Math.floor(time / 3600);

  const minutesTime = time - hours * 3600;
  const minutes = Math.floor(minutesTime / 60);

  const seconds = Math.floor(minutesTime - minutes * 60);

  const miliseconds = Math.floor((mcs / 100) % 10);

  return { miliseconds, seconds, minutes, hours };
};

export const formatTime = (
  miliseconds: number,
  seconds: number,
  minutes: number,
  hours: number,
): string => {
  return `${hours ? `${putLeadingZero(hours, 2)}h ` : ''}${
    minutes ? `${putLeadingZero(minutes, 2)}m ` : ''
  }${
    seconds || miliseconds
      ? `${putLeadingZero(seconds, 2)}.${miliseconds || '0'}s `
      : '00.0s'
  }`;
};

export const getRandomColor = (): string =>
  Math.floor(Math.random() * 16777215).toString(16);
