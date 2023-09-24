import { View, Text } from "react-native"
import {useEffect} from 'react'

export const SplashScreen = ({navigation})=>{
    useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen')
      navigation.reset({index:0,routes:[{name:'SignInScreen'}]})
    },2000)
  })
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Splash Screen</Text>
    </View>
  )
    
}