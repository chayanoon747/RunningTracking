import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { SplashScreen } from '../screens/SplashScreen'
import { BottomTabNav } from './BottomTabNav'

export const StackNav = ()=>{
  const Stack = createNativeStackNavigator()
  return(
    <Stack.Navigator
      initialRouteName="SplashScreen" 
    >
      {/* Splash Screen */}
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      {/* BottomTabNav */}
      <Stack.Screen
        name='BottomTabNav'
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}