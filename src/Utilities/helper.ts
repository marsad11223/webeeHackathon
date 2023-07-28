import uuid from 'react-native-uuid'

export const getId = () => {
  return uuid.v4();
}