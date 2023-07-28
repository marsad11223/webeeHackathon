import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getId, hp, wp } from '../Utilities/helper';
import { createCategory } from '../store/reducers/categoryReducer';
import { Category } from '../store/interfaces';
import CategoryComponent from '../components/CategoryComponent';

const Categories: React.FC = () => {
  const { categories } = useAppSelector(state => state.category)
  const dispatch = useAppDispatch();

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryComponent item={item} />
  );

  return (
    <View style={styles.container}>
      {categories.length ?
        <View style={{
        }}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View> :
        <Text style={styles.note}>No Categories to display</Text>
      }
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={'ADD A CATEGEORY'}
          onPress={() => {
            dispatch(createCategory({ id: getId(), name: 'New Catageory', attributes: [] }))
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

export default Categories;
