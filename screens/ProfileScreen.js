import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EditComp } from "../components/EditComp";

export const ProfileScreen = ({navigation})=>{

    const { width, height } = Dimensions.get('window');
    console.log(width, height);

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
                    <View style={{width: width*1.5, height: height/2.5, backgroundColor: 'purple', borderBottomLeftRadius: 300, borderBottomRightRadius: 300}}>
                        <View style={{flex:1, borderWidth:3, borderColor:'pink', justifyContent:'flex-end', marginBottom:20}}>
                            <View style={{width:150,height:150, borderWidth:3, borderColor:'white', position:'absolute',left:'50%', borderRadius:100,
                                        marginLeft: -75,marginBottom: -75}}
                            >
                                
                            </View>
                        </View>
                        <View style={{flex:0.4, marginHorizontal:'25%',borderWidth:3, borderColor:'yellow'}}>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>CHAYANON </Text>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>PISSANUWATTANASAK</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, borderWidth:3, borderColor:'red', marginTop:10}}>
                    <View style={{flex:3}}>
                        <View style={{flex:1, margin:10}}>
                            <EditComp value="chayanon pissanuwattanasak"/>
                            <EditComp value="chayanon.pi@ku.th"/>
                            <EditComp value="0816538747"/>
                        
                            
                        </View>
                        
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:'#DC143C', justifyContent:'center', borderRadius:20, marginVertical:10, marginHorizontal:30}}
                            onPress={()=>{
                                navigation.navigate('SignInScreen')
                            }}
                        >
                            <Text style={{fontFamily:'Roboto_900Black', textAlign:'center', color:'white'}}>SIGN OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}