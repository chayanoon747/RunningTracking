import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export const AuthInput = (props) => {
  const { secureTextEntry, value, onChangeText } = props

  return (
    <View style={{ flex: 1, paddingVertical: 5, borderWidth: 0, justifyContent: 'center' }}>
      {secureTextEntry
        ? (<TextInput
          secureTextEntry={true}
          style={regStyles.inputBox}
          placeholder={props.placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={(text) => onChangeText(text)}
        ></TextInput>)
        : (<TextInput
          style={regStyles.inputBox}
          placeholder={props.placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={(text) => onChangeText(text)}
        ></TextInput>)
      }
    </View>
  )
}

const regStyles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#EEFCDC'
  },
  inputContainer : {
    borderTopLeftRadius:40,
    borderBottomRightRadius:40,
    backgroundColor:'#E8EAE6',
    paddingVertical:0,
    paddingHorizontal:20,
  },
  inputBox:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:20,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:40
  }
})