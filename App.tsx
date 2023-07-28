import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store } from './src/store/store';
import Navigator from './src/navigation/Navigator';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
