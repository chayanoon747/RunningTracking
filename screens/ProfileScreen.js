import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EditComp } from "../components/EditComp";
import { useState } from "react";

export const ProfileScreen = ({navigation})=>{

    const { width, height } = Dimensions.get('window');
    const [firstName, setFirstName] = useState('Chayanon');
    const [lastName, setLastName] = useState('Pissanuwattanasak');
    const firstNameUpper = firstName.toUpperCase()
    const lastNameUpper = lastName.toUpperCase()

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black
    });

    if (!fontsLoaded) {
        return null; 
    }
    
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={{width: width*1.5, height: height/2.5, backgroundColor: 'black', borderBottomLeftRadius: 300, borderBottomRightRadius: 300}}>
                        <View style={{flex:1, justifyContent:'flex-end', marginBottom:20}}>
                            <View style={{width:150,height:150, borderWidth:3, borderColor:'white', position:'absolute',left:'50%', borderRadius:100,
                                        marginLeft: -75,marginBottom: -75}}> 
                            </View>
                        </View>
                        <View style={{flex:0.4, marginHorizontal:'25%'}}>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>{firstNameUpper}</Text>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>{lastNameUpper}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:3}}>
                        <View style={{flex:1, marginTop:10, marginHorizontal:25}}>
                            <EditComp value={firstName}/>
                            <EditComp value={lastName}/>
                            <EditComp value="chayanon.pi@ku.th"/>
                        </View>
                        
                    </View>
                    <View style={{flex:1, paddingBottom:8}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:'#DC143C', justifyContent:'center', borderRadius:20, marginVertical:12, marginHorizontal:25}}
                            onPress={()=>{
                                navigation.navigate('SignInScreen')
                            }}
                        >
                            <Text style={{fontFamily:'Roboto_900Black', textAlign:'center', color:'white', fontSize:16}}>SIGN OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}