import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createItem, hp, wp } from '../utilities/helper';
import { Attribute, Category, Item } from '../store/interfaces';
import { useRoute } from '@react-navigation/native';
import ItemComponent from '../components/ItemComponent';
import { addItem } from '../store/reducers/categoryReducer';
interface RouteParams {
  categoryId: string;
}

const Items: React.FC = () => {

  const route = useRoute();
  const dispatch = useAppDispatch();

  const { categoryId } = route.params as RouteParams;
  const category: Category | undefined = useAppSelector(state => state.category.categories.find(category => category.id === categoryId));
  const attributes: Attribute[] = category ? category.attributes : [];
  const items: Item[] = category ? category.items : [];

  const renderItem = ({ item, index }: { item: Item, index: number }) => (
    <ItemComponent
      item={item}
      category={category}
      attributes={attributes}
      index={index}
    />
  );

  return (
    <View style={styles.container}>
      {items.length ?
        <View style={{
          width: '100%'
        }}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View> :
        <Text style={styles.note}>No Categories to display</Text>
      }
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={'ADD AN ITEM'}
          onPress={() => {
            dispatch(addItem({ categoryId, item: createItem(attributes) }))
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: wp(20),
    paddingVertical: hp(10)
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp(20),
    width: '90%'
  },
  note: {
    fontSize: 12,
    marginTop: 10,
    color: 'gray',
  }
});

export default Items;
