import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';

import PrimaryButton from './PrimaryButton';
import TypesPopover from './TypesPopover';
import InputField from './InputField';
import { useAppDispatch } from '../store/hooks';
import { getId, types } from '../utilities/helper';
import { Category } from '../store/interfaces';
import {
  addAttribute,
  deleteAttribute,
  updateAttribute,
  deleteCategory,
  updateCategory
} from '../store/reducers/categoryReducer';

type CategoryTypes = {
  item: Category
};

const CategoryComponent: React.FC<CategoryTypes> = ({
  item,
}) => {

  const { id, name, titleField, attributes } = item;
  const dispatch = useAppDispatch();

  const getTitle = () => {
    const titleAttribute = attributes.find((attribute) => attribute.id === titleField);
    if (titleAttribute) {
      return titleAttribute?.name !== '' ? titleAttribute.name : 'UNNAMED FIELD';
    } else {
      return 'UNNAMED FIELD';
    }
  }

  const updateField = (
    id: string,
    attributeId: string,
    key: string,
    value: string
  ) => {
    dispatch(updateAttribute(
      {
        categoryId: id,
        attributeId: attributeId,
        attributeKey: key,
        attributeValue: value
      }))
  }

  const deleteField = (id: string, attributeId: string) => {
    dispatch(deleteAttribute({ categoryId: id, attributeId: attributeId }))
  }

  const deleteCat = (id: string) => {
    dispatch(deleteCategory(id))
  }

  const updateCategeory = (id: string, key: keyof Category, value: any) => {
    dispatch(updateCategory({ id, key, value }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{item.name}</Text>

      <InputField
        onChange={(e) => { updateCategeory(id, 'name', e) }}
        value={name.toString()}
        width={'100%'}
      />

      {attributes.map((attribute, index) => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10
        }}
          key={index}>
          <InputField
            onChange={(e) => {
              updateField(id, attribute.id, 'name', e)
            }}
            value={attribute.name}
            width={'60%'}
          />

          <View>
            <TypesPopover onPress={(type: string) => {
              updateField(id, attribute.id, 'type', type)
            }}>
              <Text> {types[attribute.type]}</Text>
            </TypesPopover>
          </View>
          <Button
            size={'sm'}
            backgroundColor={'red.500'}
            onPress={() => {
              deleteField(id, attribute.id)
            }}
          >
            Delete
          </Button>
        </View>
      ))}

      <TypesPopover
        data={attributes}
        onPress={(type: string) => {
          updateCategeory(id, 'titleField', type)
        }}>
        <PrimaryButton title={`TITLE FIELD: ${getTitle()}`} />
      </TypesPopover>

      <TypesPopover
        onPress={(type: string) => {
          dispatch(addAttribute({
            categoryId: id,
            attribute: {
              id: getId(),
              name: '',
              type: type
            }
          }))
        }}>
        <PrimaryButton title='ADD NEW FIELD' />
      </TypesPopover>
      <PrimaryButton
        title='REMMOVE Categeory'
        backgroundColor='red.500'
        onPress={() => { deleteCat(id) }}
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
  label: {
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 10
  },

});

export default CategoryComponent;
