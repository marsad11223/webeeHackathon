import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Input, Switch } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import { useAppDispatch } from '../store/hooks';
import { Category, Item, Attribute } from '../store/interfaces';
import { getTitle, hp } from '../utilities/helper';
import { updateItem, deleteItem } from '../store/reducers/categoryReducer';
import PrimaryButton from './PrimaryButton';

type ItemTypes = {
  item: Item,
  category: Category | undefined,
  attributes: Attribute[],
  index: number
};

const ItemComponent: React.FC<ItemTypes> = ({ item, category, attributes, index }) => {

  const dispatch = useAppDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const title = category ? getTitle(category?.titleField, attributes) : '';

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (key: string, date: Date) => {
    updateField(key, moment(date).format('MM.DD.YYYY'))
    hideDatePicker();
  };

  const handleRemove = () => {
    if (category?.id) {
      dispatch(deleteItem({ categoryId: category.id, itemId: item.id }))
    } else {
      console.log('No catageory found');
    }
  };

  const updateField = (key: string, value: string | boolean | Date | number) => {
    dispatch(updateItem({
      categoryId: category?.id || '',
      itemIndex: index,
      itemKey: key,
      itemValue: value
    }))
  }

  const getInputField = (type: string, key: string) => {

    if (type === 'string') {
      return <Input
        size={'lg'}
        variant="filled"
        onChangeText={e => {
          updateField(key, e)
        }}
        value={item[key] ? item[key].toString() : ''}
      />
    } else if (type === 'number') {
      return <Input
        size={'lg'}
        variant="filled"
        keyboardType='numeric'
        onChangeText={e => {
          updateField(key, parseFloat(e))
        }}
        value={item[key] ? item[key].toString() : ''}
      />
    } else if (type === 'boolean') {
      const boolValue = item[key] === true;
      return <Switch
        value={boolValue}
        onToggle={e => {
          updateField(key, e)
        }}
      />
    } else if (type === 'Date') {
      return <View>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
          <Text style={{ marginLeft: 10 }}>
            {item[key] ? item[key].toString() : 'select date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(e) => handleConfirm(key, e)}
          onCancel={hideDatePicker}
        />
      </View>
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryLabel}>{item[title] ? item[title].toString() : 'UNNAMED FIELD'}</Text>

      {attributes.map((attributes, index) => {
        return (
          <View key={index}>
            <Text style={styles.label}>{attributes.name || 'UNNAME FIELD'}</Text>
            {getInputField(attributes.type, attributes.name)}
          </View>
        );
      })}
      <PrimaryButton
        title={'Remove'}
        onPress={handleRemove}
        backgroundColor='red.500'
      />
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
  dateInput: {
    height: hp(30),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center'
  },
});

export default ItemComponent;
