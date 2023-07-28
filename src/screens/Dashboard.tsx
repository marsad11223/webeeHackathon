import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { createCategory } from '../store/reducers/categoryReducer';
import PrimaryButton from '../components/PrimaryButton';
import useNavigate from '../hooks/useNavigation';

const Dashboard: React.FC = () => {

  const { categories } = useAppSelector(state => state.category)
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  console.log(categories);

  useEffect(() => {
    // dispatch(createCategory({ name: 'testing', id: 12 }))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard!</Text>
      <Text style={styles.subtitle}>No Catageoty Found</Text>
      <View>
        <PrimaryButton title={'ADD A CATEGEORY'} onPress={() => { navigate('Categories') }} />
      </View>
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
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFF',
    fontWeight: '600'
  }
});

export default Dashboard;
