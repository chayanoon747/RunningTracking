import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { TextInput} from "react-native-paper";
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { RunningAnimated } from "../components/animations/RunningAnimated";
import { useState } from "react";
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';

const images = [require('../assets/RunningMan_1.png'), require('../assets/RunningMan_2.png'),
                require('../assets/RunningMan_3.png'), require('../assets/RunningMan_4.png')];

export const SignUpScreen = ({navigation})=>{
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullnameValid, setFullNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
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

    const handleSignUp = () => {
        setEventTextInput(1)
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

    const handleColor = (name, event)=>{
        if(eventTextInput == 0){
            if(event == 'iconColor') return 'black';
            if(event == 'borderColor') return 'transparent';
            if(event == 'borderWidth') return 0;
            
        }else{ 
            if(name == 'fullname'){
                if(event == 'iconColor') return fullname? 'black':'red';
                if(event == 'borderColor') return fullname? 'transparent':'red';
                if(event == 'borderWidth') return fullname? 0:2;
            }
            if(name == 'email'){
                if(event == 'iconColor') return email ? 'black':'red';
                if(event == 'borderColor') return email ? 'transparent':'red';
                if(event == 'borderWidth') return email ? 0:2;
            }
            if(name == 'password'){
                if(event == 'iconColor') return password ? 'black':'red';
                if(event == 'borderColor') return password ? 'transparent':'red';
                if(event == 'borderWidth') return password ? 0:2;
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
                <View style={{flex:1, paddingHorizontal:'5%', paddingTop:'5%', paddingBottom:'2%'}}>
                            
                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <AntDesign name="user" size={24} color={handleColor('fullname','iconColor')} style={{paddingRight:10}}/>
                        <TextInput label="FULLNAME" value={fullname} onChangeText={text => setFullName(text)} 
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
                        <TextInput label="EMAIL" value={email} onChangeText={text => setEmail(text)} 
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
                        <TextInput label="PASSWORD" value={password} onChangeText={text => setPassword(text)} 
                            style={[styles.textinput,{borderColor: handleColor('password','borderColor'), borderWidth: handleColor('password','borderWidth')}]} 
                            underlineColor="transparent"
                            textColor='black'
                            activeUnderlineColor={handleColor('password','iconColor')}
                            secureTextEntry={true}
                            keyboardType='default'
                        >
                        </TextInput>
                    </View>
                    
                    
                    
                    <TouchableOpacity style={{flex:0.5, alignItems:'flex-end'}}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.5}}></View>
                    
                    <TouchableOpacity 
                        style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'black', borderRadius:20, borderWidth:3, borderColor:'black'}}
                        onPress={handleSignUp}
                    >
                        <Text style={{color:'white', fontFamily: 'Roboto_900Black', fontWeight:'bold', fontSize:18}}>SIGN UP</Text>
                    </TouchableOpacity>

                    <View style={{flex:1.3, flexDirection:'row', paddingTop:'3%'}}>
                        <TouchableOpacity style={{flex:1, alignItems:'center',borderColor:'black',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={googleIcon} style={{flex:1, resizeMode:'center'}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity disabled={true} style={{flex:1, alignItems:'center',borderColor:'#F0F0F0',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={appleIcon} style={{flex:1, resizeMode:'center', opacity:0.2}}></Image>
                        </TouchableOpacity>
                        <View style={{flex:0.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:1, fontWeight:'bold', textAlign:'center'}}>OR</Text>
                        </View>
                        <TouchableOpacity disabled={true} style={{flex:1, alignItems:'center',borderColor:'#F0F0F0',borderWidth:3, marginHorizontal:'4%', marginVertical:'1%', borderRadius:20}}>
                            <Image source={facebookIcon} style={{flex:1, resizeMode:'center', opacity:0.2}}></Image>
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