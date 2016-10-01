import { mapObject, identity } from './fn';
import { letterCodes } from './keycodes';
import { exampleString } from './data';
import sliceString from './slice_string';

export const baseCharArray = 'game'.split('');

export function nextState() {
  return mapObject(letterCodes, (key, val) => ({ key: val, val: identity }));
}

const startingTransformation = sliceString.left;

const transformTable = nextState();
const nextGoal = baseCharArray[0];
transformTable[nextGoal] =
  ({string, nextTransformation}) => nextTransformation(string);

const startState = {
  transformTable,
  string: baseCharArray,
  nextTransformation: startingTransformation,
  nextGoal
};

export const startInterval = 1000;

export default startState;
