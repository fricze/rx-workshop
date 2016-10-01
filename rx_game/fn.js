export const identity = x => x;
export const isValue = val => val !== null && val !== undefined;

export function spacesToUnderscore(string) {
  return string.map(letter => letter === ' ' ? '_' : letter).join('');
}

export function mapObject(obj, fn) {
  return Object.keys(obj).reduce(function(acc, currentProp) {
    const { key, val } = fn(currentProp, obj[currentProp]);
    acc[key] = val;
    return acc;
  }, {});
}
