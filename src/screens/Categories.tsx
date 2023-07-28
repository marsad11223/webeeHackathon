import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import useNavigate from '../hooks/useNavigation';
import { useAppSelector } from '../store/hooks';
import { getId } from '../Utilities/helper';

const Categories: React.FC = () => {
  const { navigate } = useNavigate();
  const { categories } = useAppSelector(state => state.category)

  return (
    <View style={styles.container}>
      {
        categories.length ?
          null
          :
          <Text style={styles.note}>No Categories to display</Text>
      }
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'ADD A CATEGEORY'} onPress={() => { navigate('Categories') }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '90%'
  },
  note: {
    fontSize: 12,
    marginTop: 10,
    color: 'gray',
  },
});

export default Categories;
