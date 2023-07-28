import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type PrimaryButtonTypes = {
  onPress?: () => void;
  title?: string;
};

const PrimaryButton: React.FC<PrimaryButtonTypes> = ({
  onPress = () => { },
  title = '',
}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.5}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%'
  },
  buttonText: {
    color: '#FFFF',
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default PrimaryButton;
