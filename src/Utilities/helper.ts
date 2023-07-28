import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid'

export const windowHeight: number = Dimensions.get('window').height;
export const windowWidth: number = Dimensions.get('window').width;

export const hp = (height: number) => (height / 812) * windowHeight;

export const wp = (width: number) => (width / 375) * windowWidth;

export const getId = (): string => {
  return String(uuid.v4());
}
interface TypeMap {
  [key: string]: string;
}
export const types: TypeMap = {
  string: 'Text',
  number: 'Number',
  boolean: 'CheckBoxes',
  Date: 'Date'
}