import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { TextInput } from "react-native-paper";
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export const SignInScreen = ({navigation})=>{
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
            <View style={{flex:1, borderWidth:2, borderColor:'red'}}>

            </View>
            <View style={{flex:2, borderWidth:2, borderColor:'green', margin:20}}>

                <View style={{flex:1.5, borderWidth:2, borderColor:'pink'}}>
                    <Text style={{fontFamily: 'Roboto_900Black', fontSize:40, fontWeight:'bold'}}>Login</Text>
                    <Text style={{marginTop:10,fontFamily: 'Roboto_500Medium', fontSize:18, color:'gray', fontWeight:'bold'}}>Please sign in to continue.</Text>
                </View>

                <View style={{flex:2, borderWidth:2, borderColor:'purple'}}>
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

                <View style={{flex:1, flexDirection:'row', borderWidth:2, borderColor:'blue'}}>
                    <View style={{flex:2, borderWidth:2, borderColor:'pink'}}></View>
                    <View style={{flex:1.4, borderWidth:2, borderColor:'cyan'}}>
                        <TouchableOpacity style={{flex:1, marginVertical:'10%'}}
                            onPress={()=>{
                                navigation.navigate('BottomTabNav')
                            }}
                        >
                            <LinearGradient 
                                colors={['#fd5c63','#DE3163', '#E31837']} 
                                style={{flex:1,flexDirection:'row', borderRadius:50, justifyContent:'center', alignItems:'center'}}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                                <Text style={{fontFamily: 'Roboto_700Bold', fontSize:20, color:'white', marginRight:'10%'}}>LOGIN</Text>
                                <AntDesign name="arrowright" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flex:1, flexDirection:'row',borderWidth:2, borderColor:'blue', justifyContent:'center', alignItems:'flex-end'}}>
                <Text style={{fontFamily: 'Roboto_700Bold', color:'gray'}}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('SignUpScreen')
                    }}
                >
                    <Text style={{fontFamily: 'Roboto_900Black', color:'orange'}}> Sign Up</Text>
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