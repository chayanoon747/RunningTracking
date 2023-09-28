import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { SplashScreen } from '../screens/SplashScreen'
import { BottomTabNav } from './BottomTabNav'
import { SignInScreen } from '../screens/SignInScreen'
import { SignUpScreen } from '../screens/SignUpScreen'

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

      <Stack.Screen
        name='SignInScreen'
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
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