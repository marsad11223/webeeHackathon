import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Switch } from 'native-base';

import InputField from './InputField';
import { useAppDispatch } from '../store/hooks';
import { Category, Item, Attribute } from '../store/interfaces';
import { getId, getTitle } from '../utilities/helper';
import { updateItem } from '../store/reducers/categoryReducer';

type ItemTypes = {
  item: Item,
  category: Category | undefined,
  attributes: Attribute[],
  index: number
};

const ItemComponent: React.FC<ItemTypes> = ({ item, category, attributes, index }) => {

  const dispatch = useAppDispatch();
  const title = category ? getTitle(category?.titleField, attributes) : '';
  console.log(item);

  const getInputField = (type: string, key: string) => {
    if (type === 'string') {
      return <Input
        size={'lg'}
        variant="filled"
        onChangeText={e => {
          dispatch(updateItem({
            categoryId: category?.id || '',
            itemIndex: index,
            itemKey: key,
            itemValue: e
          }))
        }}
      />
    } else if (type === 'number') {
      return <Input
        size={'lg'}
        variant="filled"
        keyboardType='numeric'
        onChangeText={e => {
          dispatch(updateItem({
            categoryId: category?.id || '',
            itemIndex: index,
            itemKey: key,
            itemValue: parseFloat(e)
          }))
        }}
      />
    } else if (type === 'boolean') {
      return <Switch
        onToggle={e => {
          dispatch(updateItem({
            categoryId: category?.id || '',
            itemIndex: index,
            itemKey: key,
            itemValue: e
          }))
        }}
      />
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryLabel}>{title}</Text>

      {attributes.map((attributes, index) => {
        return (
          <View key={index}>
            <Text style={styles.label}>{attributes.name || 'UNNAME FIELD'}</Text>
            {getInputField(attributes.type, attributes.name)}
          </View>
        );
      })}

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryLabel: {
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 20,
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    marginBottom: 7,

  },

});

export default ItemComponent;
