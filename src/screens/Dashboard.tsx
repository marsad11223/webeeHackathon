import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

import useNavigate from '../hooks/useNavigation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addItem } from '../store/reducers/categoryReducer';
import { createItem, hp, wp } from '../utilities/helper';
import PrimaryButton from '../components/PrimaryButton';
import ItemComponent from '../components/ItemComponent';
import { Category, Item } from '../store/interfaces';

type HeaderProps = {
  title: string;
  onPress: () => void
}
const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();
  const { categories } = useAppSelector((state) => state.category);

  const Header = ({ title, onPress }: HeaderProps) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <PrimaryButton title="Add New Item" onPress={onPress} />
      </View>
    );
  };

  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <View style={styles.categoryContainer}>
        <Header
          title={item.name}
          onPress={() => {
            dispatch(addItem({ categoryId: item.id, item: createItem(item.attributes) }));
          }}
        />
        <FlatList
          data={item.items}
          renderItem={({ item: itemData, index }) => (
            <ItemComponent
              key={index}
              item={itemData}
              category={item}
              attributes={item.attributes}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyItem}
        />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard!</Text>
      <Text style={styles.subtitle}>No Category Found</Text>
      <PrimaryButton title="ADD A CATEGORY" onPress={() => { navigate('Categories'); }} />
    </View>
  );

  const renderEmptyItem = () => (
    <View style={[styles.container, { marginVertical: hp(20) }]}>
      <Text style={styles.subtitle}>No Item Found</Text>
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={styles.scrollViewContent}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    marginVertical: hp(10),
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
  },
  categoryContainer: {
    paddingHorizontal: wp(10),
  },
});

export default Dashboard;
