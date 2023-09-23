import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StackNav } from './navigators/StackNav';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <StackNav/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
