import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'native-base'

type PrimaryButtonTypes = {
  onPress?: () => void;
  title?: string;
};

const PrimaryButton: React.FC<PrimaryButtonTypes> = ({
  onPress,
  title = '',
}) => {

  return (
    <Button
      style={styles.container}
      size={'sm'}
      onPress={onPress}
      disabled={!onPress}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default PrimaryButton;
