import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';

const HomeScreen: React.FC = () => {

  const { categories } = useAppSelector(state => state.category)

  console.log(categories);

  useEffect(() => {
    // dispatch(createCategory({ name: 'testing', id: 12 }))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HomeScreen!</Text>
      <Text style={styles.subtitle}>This is a simple React Native app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeScreen;
