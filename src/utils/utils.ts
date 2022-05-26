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
