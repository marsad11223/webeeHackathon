import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid'
import { Attribute, Item, Type } from '../store/interfaces';

export const windowHeight: number = Dimensions.get('window').height;
export const windowWidth: number = Dimensions.get('window').width;

export const hp = (height: number) => (height / 812) * windowHeight;
export const wp = (width: number) => (width / 375) * windowWidth;

export const getId = (): string => {
  return String(uuid.v4());
}

export const types: Type = {
  string: 'Text',
  number: 'Number',
  boolean: 'CheckBox',
  Date: 'Date'
}

export const getTitle = (titleField: string, attributes: Attribute[]) => {
  const titleAttribute = attributes.find((attribute) => attribute.id === titleField);
  if (titleAttribute) {
    return titleAttribute?.name !== '' ? titleAttribute.name : 'UNNAMED FIELD';
  } else {
    return 'UNNAMED FIELD';
  }
}

export const createItem = (attributes: Attribute[]): Item => {
  const item: Item = { id: getId() };
  attributes.forEach(attr => {
    if (attr.type === 'string') {
      item[attr.name] = '';
    } else if (attr.type === 'number') {
      item[attr.name] = 0;
    } else if (attr.type === 'boolean') {
      item[attr.name] = false;
    } else if (attr.type === 'Date') {
      item[attr.name] === new Date()
    }
  });
  return item;
};