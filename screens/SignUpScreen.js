import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView} from "react-native"
import { TextInput} from "react-native-paper";
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { RunningAnimated } from "../components/animations/RunningAnimated";
import { useState } from "react";
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { signUpEmailPass} from '../firebase/AuthModel'

const images = [require('../assets/RunningMan_1.png'), require('../assets/RunningMan_2.png'),
                require('../assets/RunningMan_3.png'), require('../assets/RunningMan_4.png')];

export const SignUpScreen = ({navigation})=>{
    const [profile, setProfile] = useState({'fullname':'','email':'','password':'','cfPassword':''})
    const [eventTextInput, setEventTextInput] = useState(0);

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

    const setFullName = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          fullname:text
        }))
    }

    const setEmail = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          email:text
        }))
    }

    const setPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          password:text
        }))
    }

    const setCFPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          cfPassword:text
        }))
    }

    const success = (doc) => {
        Alert.alert(`${doc.fullname} has been added to system`)
        navigation.goBack()
    }

    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    const handleSignUp = async() => {
        setEventTextInput(1)

        let isFullNameValid = true;
        let isEmailValid = true;
        let isPasswordValid = true;
        let isCFPasswordValid = true;
        
        while (true) {
            if (!profile.fullname) {
                isFullNameValid = false;
                Alert.alert('Please provide your fullname information');
                break;
            } else {
                const hasSpace = profile.fullname.includes(' ');
                if (!hasSpace) {
                    isFullNameValid = false;
                    Alert.alert('Please insert a space between your first and last name');
                    break;
                }
            }
          
            if (!profile.email) {
                isEmailValid = false;
                Alert.alert('Please provide your email information');
                break;
            }
          
            if (!profile.password) {
                isPasswordValid = false;
                Alert.alert('Please provide your password information');
                break;
            } else {
                if (!profile.cfPassword) {
                    isPasswordValid = false;
                    Alert.alert('Please provide your confirm password information');
                    break;
                } else {
                    if (profile.password !== profile.cfPassword) {
                        isCFPasswordValid = false;
                        Alert.alert('Passwords do not match');
                        break;
                    }
                }
            }
            break;
        }

        if (isFullNameValid && isEmailValid && isPasswordValid) {
            console.log('success');
            //signUpEmailPass(profile, success, unsuccess)
          } else {
            console.log('Signed up unsuccessful!!');
            console.log(`isFullNameValid: ${isFullNameValid}`);
            console.log(`isEmailValid: ${isEmailValid}`);
            console.log(`isPasswordValid: ${isPasswordValid}`);
          }
    };

    const handleColor = (name, event)=>{
        if(eventTextInput == 0){
            if(event == 'iconColor') return 'black';
            if(event == 'borderColor') return 'transparent';
            if(event == 'borderWidth') return 0;
            
        }else{ 
            if(name == 'fullname'){
                if(event == 'iconColor') return profile.fullname? 'black':'red';
                if(event == 'borderColor') return profile.fullname? 'transparent':'red';
                if(event == 'borderWidth') return profile.fullname? 0:2;
            }
            if(name == 'email'){
                if(event == 'iconColor') return profile.email ? 'black':'red';
                if(event == 'borderColor') return profile.email ? 'transparent':'red';
                if(event == 'borderWidth') return profile.email ? 0:2;
            }
            if(name == 'password'){
                if(event == 'iconColor') return profile.password ? 'black':'red';
                if(event == 'borderColor') return profile.password ? 'transparent':'red';
                if(event == 'borderWidth') return profile.password ? 0:2;
            }
            if(name == 'cfPassword'){
                if(event == 'iconColor') return profile.cfPassword ? 'black':'red';
                if(event == 'borderColor') return profile.cfPassword ? 'transparent':'red';
                if(event == 'borderWidth') return profile.cfPassword ? 0:2;
            }
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
            <View style={{flex:2}}>
                <View style={{flex:1, padding:10}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', marginBottom:10}}>  
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{backgroundColor:'white', width:30, borderTopRightRadius:10, borderBottomLeftRadius:10}}
                                onPress={()=>{
                                    navigation.goBack()
                                }}
                            >
                                <AntDesign name="arrowleft" size={30} color="black"/>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:2}}>
                            <Text style={{fontSize:30, fontFamily: 'Roboto_900Black', fontWeight:'bold', color:'white', textAlign:'center'}}>SIGN UP</Text>
                        </View>

                        <View style={{flex:1}}></View>
                    </View>

                    <View style={{flex:6,borderWidth:3, borderColor:'white'}}>
                        <RunningAnimated images={images} />
                    </View>
                </View>
            </View>

            <View style={{flex:3, borderTopLeftRadius:60, borderTopRightRadius:60, backgroundColor:'white'}}>
                <View style={{flex:1, marginHorizontal:'5%', marginTop:'5%', marginBottom:'2%'}}>
                            
                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <AntDesign name="user" size={24} color={handleColor('fullname','iconColor')} style={{paddingRight:10}}/>
                        <TextInput label="FULLNAME" value={profile.fullname} onChangeText={text => setFullName(text)} 
                            style={[styles.textinput,{borderColor: handleColor('fullname','borderColor'), borderWidth: handleColor('fullname','borderWidth')}]} 
                            underlineColor="transparent"
                            textColor='black'
                            activeUnderlineColor={handleColor('fullname','iconColor')}
                            keyboardType='default'
                            
                        >
                        </TextInput>
                    </View>

                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <MaterialCommunityIcons name="email-outline" size={24} color={handleColor('email','iconColor')} style={{paddingRight:10}}/>
                        <TextInput label="EMAIL" value={profile.email} onChangeText={text => setEmail(text)} 
                            style={[styles.textinput,{borderColor: handleColor('email','borderColor'), borderWidth: handleColor('email','borderWidth')}]} 
                            underlineColor="transparent"
                            textColor='black'
                            activeUnderlineColor={handleColor('email','iconColor')}
                            keyboardType='email-address'
                        >
                        </TextInput>
                    </View>

                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Feather name="lock" size={24} color={handleColor('password','iconColor')} style={{paddingRight:10}}/>
                        <TextInput label="PASSWORD" value={profile.password} onChangeText={text => setPassword(text)} 
                            style={[styles.textinput,{borderColor: handleColor('password','borderColor'), borderWidth: handleColor('password','borderWidth')}]} 
                            underlineColor="transparent"
                            textColor='black'
                            activeUnderlineColor={handleColor('password','iconColor')}
                            secureTextEntry={true}
                            keyboardType='default'
                        >
                        </TextInput>
                    </View>

                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Feather name="lock" size={24} color={handleColor('cfPassword','iconColor')} style={{paddingRight:10}}/>
                        <TextInput label="CONFIRM PASSWORD" value={profile.cfPassword} onChangeText={text => setCFPassword(text)} 
                            style={[styles.textinput,{borderColor: handleColor('cfPassword','borderColor'), borderWidth: handleColor('cfPassword','borderWidth')}]} 
                            underlineColor="transparent"
                            textColor='black'
                            activeUnderlineColor={handleColor('cfPassword','iconColor')}
                            secureTextEntry={true}
                            keyboardType='default'
                        >
                        </TextInput>
                    </View>
                    
                    <View style={{flex:0.5}}></View>
                    
                    <TouchableOpacity 
                        style={{flex:0.8, justifyContent:'center', alignItems:'center', backgroundColor:'black', borderRadius:20, borderWidth:3, borderColor:'black'}}
                        onPress={handleSignUp}
                    >
                        <Text style={{color:'white', fontFamily: 'Roboto_900Black', fontWeight:'bold', fontSize:18}}>SIGN UP</Text>
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
        marginVertical:10,
        backgroundColor:'#F0F0F0',
    },
  });