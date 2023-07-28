import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Popover, Box, VStack } from 'native-base';

import { types, wp } from '../Utilities/helper';

type popoverTypes = {
  onPress: (type: string) => void,
  children: any,
  data?: any[]
};

const TypesPopover = ({
  onPress, children,
  data = Object.keys(types) }: popoverTypes
) => {

  const [isOpen, setIsOpen] = useState(false);

  return <Box w="100%" alignItems="center" >
    <VStack space={6} alignSelf="flex-start" w="100%">
      <Popover // @ts-ignore
        placement={undefined}
        trigger={triggerProps => {
          return <TouchableOpacity
            {...triggerProps}
            activeOpacity={0.5}
            onPress={() => setIsOpen(true)}
          >
            {children}
          </TouchableOpacity>;
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <Popover.Content style={{ width: wp(100) }}>
          <Popover.Arrow />
          <Popover.Body>
            {data.map((key, index) => (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => {
                  setIsOpen(false);
                  onPress(key.id ?? key);
                }}
              >
                <Text>
                  {key.id ? (key.name ? key.name : 'UNNAMED') : types[key]}</Text>
              </TouchableOpacity>
            ))}
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </VStack>
  </Box>;
}

export default TypesPopover;