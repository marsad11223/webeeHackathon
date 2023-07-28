import React, { JSXElementConstructor, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button, Popover, Box, VStack } from 'native-base';

import { Category } from '../store/interfaces';
import { types, wp } from '../Utilities/helper';
import PrimaryButton from './PrimaryButton';
import InputField from './InputField';

type CategoryTypes = {
  item: Category
};

function TypesPopover({ onPress, children }: { onPress: () => void, children: any }) {
  const [position] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);

  return <Box w="100%" alignItems="center">
    <VStack space={6} alignSelf="flex-start" w="100%">
      <Popover // @ts-ignore
        placement={position === "auto" ? undefined : position}
        trigger={triggerProps => {
          return <TouchableOpacity {...triggerProps} onPress={() => setIsOpen(true)} >
            {children}
          </TouchableOpacity>;
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <Popover.Content style={{ width: wp(100) }}>
          <Popover.Arrow />
          <Popover.Body>
            {Object.keys(types).map((key) => (
              <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                <Text>{types[key]}</Text>
              </TouchableOpacity>
            ))}
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </VStack>
  </Box>;
}

const CategoryComponent: React.FC<CategoryTypes> = ({
  item,
}) => {

  const { id, name, attributes } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{item.name}</Text>
      <InputField
        onChange={() => { }}
        value={name.toString()}
        width={'100%'}
      />

      {attributes.map(attribute => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10
        }}>
          <InputField
            key={attribute.id}
            onChange={() => { }}
            value={attribute.name}
            width={'60%'}
          />

          <View>
            <TypesPopover onPress={() => { }}>
              <Text> {types[typeof attribute.type]}</Text>
            </TypesPopover>
          </View>
          <Button
            size={'sm'}
            backgroundColor={'red.500'}
            onPress={() => console.log("Delete")}
          >
            Delete
          </Button>
        </View>
      ))}
      <TypesPopover onPress={() => { }}>
        <PrimaryButton title='ADD NEW FIELD' />
      </TypesPopover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 10
  },

});

export default CategoryComponent;
