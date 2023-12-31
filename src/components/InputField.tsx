import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Input } from 'native-base';

type InputFieldTypes = {
  value?: string,
  width?: string,
  onChange?: (e: string) => void,
  placeholder?: string
};

const InputField = ({
  value = '',
  width = '100%',
  onChange = (e) => { },
  placeholder = 'Field'
}: InputFieldTypes) => {
  return (
    <View style={{
      ...styles.inputContainer,
      width: width
    }}
    >
      <Input
        size={'lg'}
        variant="filled"
        style={styles.input}
        value={value}
        onChangeText={(e) => onChange(e)}
        placeholder={placeholder}
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