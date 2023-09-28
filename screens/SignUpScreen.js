import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native"
import { TextInput, DefaultTheme } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { RunningAnimated } from "../components/animations/RunningAnimated";
import { useState } from "react";

const images = [require('../assets/RunningMan_1.png'), require('../assets/RunningMan_2.png'),
                require('../assets/RunningMan_3.png'), require('../assets/RunningMan_4.png')];

export const SignUpScreen = ({navigation})=>{
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullnameValid, setFullNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const googleIcon = require('../assets/google.png')
    const appleIcon = require('../assets/apple.png')
    const facebookIcon = require('../assets/facebook.png')

    const handleSignUp = () => {
        //handleValid()
        if(!fullname){
           setFullNameValid(false)
        }else{
            setFullNameValid(true)
        }

        if(!email){
            setEmailValid(false)
        }else{
            setEmailValid(true)
        }

        if(!password){
            setPasswordValid(false)
        }else{
            setPasswordValid(true)
        }

        if(fullname && email && password){
            console.log("Signed up successful!!")
        }else{
            console.log("Signed up unsuccessful!!")
        }
        
    };

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
            <View style={{flex:2}}>
                <View style={{flex:1, padding:10}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', marginBottom:10}}>  
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{backgroundColor:'yellow', width:30, borderTopRightRadius:10, borderBottomLeftRadius:10}}
                                onPress={()=>{
                                    navigation.goBack()
                                }}
                            >
                                <AntDesign name="arrowleft" size={30} color="black"/>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:2}}>
                            <Text style={{fontSize:30, fontWeight:'bold', color:'white', textAlign:'center'}}>SIGN UP</Text>
                        </View>

                        <View style={{flex:1}}></View>
                    </View>

                    <View style={{flex:6,borderWidth:3, borderColor:'white'}}>
                        <RunningAnimated images={images} />
                    </View>
                </View>
            </View>

            <View style={{flex:3, borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:'white'}}>
                <View style={{flex:1, paddingHorizontal:'5%', paddingTop:'5%', paddingBottom:'2%'}}>
                    
                    <TextInput label="FULLNAME" value={fullname} onChangeText={text => setFullName(text)} 
                        style={[styles.textinput,{borderColor:fullnameValid ? 'transparent':'red', borderWidth:fullnameValid ? 0:2}]} 
                        underlineColor="transparent"
                        textColor='black'
                    >
                    </TextInput>
                    <TextInput label="EMAIL" value={email} onChangeText={text => setEmail(text)} 
                        style={[styles.textinput,{borderColor:emailValid ? 'transparent':'red', borderWidth:emailValid ? 0:2}]} 
                        underlineColor="transparent"
                        textColor='black'
                    >
                    </TextInput>
                    <TextInput label="PASSWORD" value={password} onChangeText={text => setPassword(text)} 
                        style={[styles.textinput,{borderColor:passwordValid ? 'transparent':'red', borderWidth:passwordValid ? 0:2}]} 
                        underlineColor="transparent"
                        textColor='black'
                        secureTextEntry={true}
                    >
                    </TextInput>
                    <TouchableOpacity style={{flex:0.5, alignItems:'flex-end'}}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.5}}></View>
                    
                    <TouchableOpacity 
                        style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'yellow', borderRadius:20, borderWidth:3, borderColor:'black'}}
                        onPress={handleSignUp}
                    >
                        <Text style={{color:'black', fontWeight:'bold', fontSize:18}}>SIGN UP</Text>
                    </TouchableOpacity>

                    <View style={{flex:1.3, flexDirection:'row', paddingTop:'3%'}}>
                        <TouchableOpacity style={{flex:1, alignItems:'center',borderColor:'black',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={googleIcon} style={{flex:1, resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity style={{flex:1, alignItems:'center',borderColor:'black',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={appleIcon} style={{flex:1, resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity style={{flex:1, alignItems:'center',borderColor:'black',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={facebookIcon} style={{flex:1, resizeMode:'center'}}></Image>
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>

        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    textinput: {
        flex:1,
        borderRadius:20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        marginVertical:10,
        backgroundColor:'#F0F0F0',
    },
  });