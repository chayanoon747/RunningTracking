import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StackNav } from './navigators/StackNav';
import { Provider } from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
