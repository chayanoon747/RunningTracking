import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { TextInput } from "react-native-paper";
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export const SignInScreen = ({navigation})=>{
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const { width, height } = Dimensions.get('window');

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black
    });

    if (!fontsLoaded) {
        return null; 
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

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{backgroundColor: 'black', width: width, height: 250, position: 'absolute', left: 0, top: '-90%', 
                                borderBottomLeftRadius: 200, borderBottomRightRadius: 200 }}>
                </View>
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
                            onFocus={handlePasswordFocus}
                            onBlur={handleTextInputBlur}   
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

                <View style={{flex:1.1, flexDirection:'row', paddingTop:5}}>
                    <View style={{flex:2}}></View>
                    <View style={{flex:1.4}}>
                        <TouchableOpacity style={{flex:1, marginVertical:'8%'}}
                            onPress={()=>{
                                navigation.navigate('BottomTabNav')
                            }}
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
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'flex-end'}}>
                <View style={{backgroundColor: 'black', width: width, height: 250, position: 'absolute', left: 0, top: '55%',
                            borderTopLeftRadius: 200, borderTopRightRadius: 200 }}>
                </View>
                <Text style={{fontFamily: 'Roboto_700Bold', color:'gray'}}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('SignUpScreen')
                    }}
                >
                    <Text style={{fontFamily: 'Roboto_900Black', color:'#FFFFFF'}}> Sign Up</Text>
                </TouchableOpacity>
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