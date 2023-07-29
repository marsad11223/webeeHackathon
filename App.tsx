import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/store/store';
import Navigator from './src/navigation/Navigator';

function App(): JSX.Element {

  return (
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NativeBaseProvider>
            <Navigator />
          </NativeBaseProvider>
        </GestureHandlerRootView>
      </Provider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
