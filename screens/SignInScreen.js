import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from "react-native"
import { TextInput } from "react-native-paper";
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { signInEmailPass } from "../firebase/AuthModel";

export const SignInScreen = ({navigation})=>{
    const [credential,setCredential] = useState({username:'',password:''})
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const { width, height } = Dimensions.get('window');

    const circle = require('../assets/circle.png')
    const googleIcon = require('../assets/google.png')
    const appleIcon = require('../assets/apple.png')
    const facebookIcon = require('../assets/facebook.png')

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black
    });

    if (!fontsLoaded) {
        return null; 
    }

    const setEmail = (text) => {
        setCredential(oldValue => ({
            ...oldValue,
            email:text
        }))
      }
    
    const setPassword = (text) => {
        setCredential(oldValue => ({
            ...oldValue,
            password:text
        }))
    }

    const success = (item) => {
        navigation.navigate('BottomTabNav')
      }
    
      const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
      }

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
        setIsPasswordFocused(false); 
    };

    const handlePasswordFocus = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(true); 
    };
    
    const handleTextInputBlur = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(false); 
    };

    const handleSignIn = ()=>{
        signInEmailPass(credential.email, credential.password, success, unsuccess)
    }

    const circlePosition = (width)=>{
        if(width < 400){
            return -(height * (50/100))
        }else if(width > 800){
            return -(height * (75/100))
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:0.8, alignItems:'center'}}>
                <Image source={circle} style={{width:width,height:width*1.3, opacity:1, position: 'absolute', left: 0, top: circlePosition(width)}}></Image>
            </View>
            <View style={{flex:2, margin:20}}>

                <View style={{flex:1.5}}>
                    <Text style={{fontFamily: 'Roboto_900Black', fontSize:40, fontWeight:'bold'}}>Login</Text>
                    <Text style={{marginTop:10,fontFamily: 'Roboto_500Medium', fontSize:18, color:'gray', fontWeight:'bold'}}>Please sign in to continue.</Text>
                </View>

                <View style={{flex:2, borderWidth:3, borderColor:'black'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', marginRight:20}}>
                        <MaterialCommunityIcons name={isEmailFocused ? 'email-open-outline' : 'email-outline'} size={24} color="black" style={{paddingHorizontal:10}}/>
                        <TextInput style={styles.textinput} 
                            label='EMAIL'
                            value={credential.email}
                            onChangeText={(text)=>{setEmail(text)}}
                            onFocus={handleEmailFocus}
                            onBlur={handleTextInputBlur}
                            activeUnderlineColor='black'
                        >
                        </TextInput>
                    </View>
                    
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', marginRight:20}}>
                        <Feather name={isPasswordFocused ? 'unlock' : 'lock'} size={24} color="black" style={{paddingHorizontal:10}}/>
                        <TextInput style={styles.textinput} 
                            label='PASSWORD'
                            value={credential.password}
                            onChangeText={(text)=>{setPassword(text)}}
                            onFocus={handlePasswordFocus}
                            onBlur={handleTextInputBlur}  
                            secureTextEntry={true} 
                            activeUnderlineColor='black'
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={{flex:0.3, paddingTop:5}}>
                    <TouchableOpacity style={{flex:1, alignItems:'flex-end'}}>
                            <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1.2, flexDirection:'row', paddingTop:5}}>
                    <View style={{flex:2}}></View>
                    <View style={{flex:1.4}}>
                        <TouchableOpacity style={{flex:1, marginVertical:'8%'}}
                            onPress={handleSignIn}
                        >
                            <LinearGradient 
                                colors={['#000000','#000000']} 
                                style={{flex:1,flexDirection:'row', borderRadius:20, justifyContent:'center', alignItems:'center'}}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                                <Text style={{fontFamily: 'Roboto_700Bold', fontSize:20, color:'white', marginRight:'10%'}}>LOGIN</Text>
                                <AntDesign name="arrowright" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1.5, flexDirection:'row', paddingTop:'3%'}}>
                        <TouchableOpacity style={{flex:1, alignItems:'center', marginHorizontal:'3%', marginVertical:'2%'}}>
                            <Image source={googleIcon} style={{flex:1, resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity disabled={true} style={{flex:1, alignItems:'center', marginHorizontal:'3%', marginVertical:'2%'}}>
                            <Image source={appleIcon} style={{flex:1, resizeMode:'center', opacity:0.2}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity disabled={true} style={{flex:1, alignItems:'center', marginHorizontal:'3%', marginVertical:'2%'}}>
                            <Image source={facebookIcon} style={{flex:1, resizeMode:'center', opacity:0.2}}></Image>
                        </TouchableOpacity>  
                </View>
            </View>

            <View style={{flex:0.5}}>
                <Image source={circle} style={{width:width,height:width*1.3, opacity:1, position: 'absolute', left: 0, bottom: circlePosition(width)}}></Image>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'flex-end'}}>
                    <Text style={{fontFamily: 'Roboto_700Bold', color:'gray'}}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('SignUpScreen')
                        }}
                    >
                        <Text style={{fontFamily: 'Roboto_900Black', color:'#FFFFFF'}}> Sign Up</Text>
                    </TouchableOpacity>
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
        backgroundColor:'#F0F0F0',
    },
  });