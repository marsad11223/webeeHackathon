import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Input } from 'native-base';

type InputFieldTypes = {
  key?: string,
  value?: string,
  width?: string,
  onChange?: () => void
};

const InputField = ({
  key,
  value = '',
  width = '100%',
  onChange = () => { }
}: InputFieldTypes) => {
  return (
    <View style={{
      ...styles.inputContainer, width: width
    }}
      key={key}
    >
      <Input
        size={'lg'}
        variant="filled"
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    padding: 5,
  },
});

export default InputField;