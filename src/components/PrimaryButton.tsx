import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base'
import { hp } from '../utilities/helper';

type PrimaryButtonTypes = {
  onPress?: () => void;
  title?: string;
  backgroundColor?: string
};

const PrimaryButton: React.FC<PrimaryButtonTypes> = ({
  onPress,
  title = '',
  backgroundColor
}) => {

  return (
    <Button
      style={styles.container}
      size={'sm'}
      onPress={onPress}
      disabled={!onPress}
      backgroundColor={backgroundColor}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(5),
  },
});

export default PrimaryButton;
