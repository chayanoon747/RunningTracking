import React,{useState} from 'react'
import {View, Text, Alert,TouchableOpacity, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthInput } from './authinput'

import {resetPassword} from '../firebase/AuthModel'

export const Recover = (props) => {
  const navigation = props.nav

  const [email,setEmail] = useState('')

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  const success = (msg) => {
    Alert.alert(msg)
    navigation.navigate('SignInScreen')
  }

  const onSendPress = () => {
    console.log(`Send email to ${email}`)
    success(`Send email to ${email}`)
    resetPassword(email, success, unsuccess)
  }

  return (
    <SafeAreaView style={regStyles.container}>

      <View style={{ flex: 1 }}></View>
      <View style={[regStyles.inputContainer,{ flex: 1,paddingVertical:30, borderWidth: 0 }]}>

        <AuthInput placeholder='Email' secureTextEntry={false} value={email} onChangeText={(text) => setEmail(text)} />

        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', borderRadius: 40 }}
          onPress={onSendPress}
        >
          <Text style={{ fontSize: 30 }}>Recover</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flex: 3 }}></View>

    </SafeAreaView>
  )
}

const regStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#E8EAE6',
    paddingVertical: 0,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40,
  },
});