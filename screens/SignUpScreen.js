import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { TextInput } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { RunningAnimated } from "../components/animations/RunningAnimated";
import { useState } from "react";
const images = [require('../assets/RunningMan_1.png'), require('../assets/RunningMan_2.png'),
                require('../assets/RunningMan_3.png'), require('../assets/RunningMan_4.png')];

export const SignUpScreen = ({navigation})=>{
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'purple'}}>
            <View style={{flex:2}}>
                <View style={{flex:1, padding:10}}>
                    <View style={{flex:1, flexDirection:'row', borderWidth:3, borderColor:'white'}}>  
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{backgroundColor:'yellow', width:30, borderTopRightRadius:10, borderBottomLeftRadius:10}}
                                onPress={()=>{
                                    navigation.goBack()
                                }}
                            >
                                <AntDesign name="arrowleft" size={30} color="black"/>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>SIGN UP</Text>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>

                    <View style={{flex:5,borderWidth:3, borderColor:'white'}}>
                        <RunningAnimated images={images} />
                    </View>
                </View>
            </View>

            <View style={{flex:3.5, borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:'white',borderWidth:3, borderColor:'red'}}>
                <View style={{flex:1, paddingHorizontal:20}}>
                    
                    <TextInput label="NAME" value={name} onChangeText={text => setName(text)} style={styles.textinput} ></TextInput>
                    <TextInput label="SURNAME" value={surname} onChangeText={text => setSurname(text)} style={styles.textinput}></TextInput>
                    <TextInput label="EMAIL" value={email} onChangeText={text => setEmail(text)} style={styles.textinput}></TextInput>
                    <TextInput label="PASSWORD" value={password} onChangeText={text => setPassword(text)} style={styles.textinput}></TextInput>
                </View>
            </View>

        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    textinput: {
      borderRadius:20,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      marginVertical:10,
      
    },
  });