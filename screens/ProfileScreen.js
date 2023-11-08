import { View, Text, Dimensions, Image, TouchableOpacity, Alert } from "react-native"
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EditComp } from "../components/EditComp";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { signOutUser } from "../firebase/AuthModel";
import { getUserData, uploadImageToFirestore } from "../firebase/UserModel"
import { useSelector } from 'react-redux'

export const ProfileScreen = ({navigation})=>{

    const { width, height } = Dimensions.get('window');
    const [fullName, setFullName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [weight, setWeight] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid
    

    useEffect(() => {
        const fetchData = async() => {
            const userData = await getUserData(userUID);
            const fullname = userData.fullname;
            const fullnameSplit = fullname.split(" ");
            setFullName(userData.fullname.toUpperCase());
            setFirstName(fullnameSplit[0].toUpperCase());
            setLastName(fullnameSplit[fullnameSplit.length - 1].toUpperCase())
            setEmail(userData.email)
            setWeight(userData.weight)
            console.log(user[0].weight)
        };
      
        fetchData();
    }, [firstName, lastName, email, weight, fullName]);

    
      

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.canceled) {
            const selectedImage = result.assets[0];
            setSelectedImage({ uri: selectedImage.uri });
            console.log(selectedImage);

            // เรียกใช้ฟังก์ชันเพื่ออัปโหลดรูปภาพไปยัง Firestore
            /*if (userUID) {
                const onlineURL = URL.createObjectURL(selectedImage.uri);
                uploadImageToFirestore(userUID, onlineURL);
            } else {
                alert('Error to upload image');
            }*/
        }
    };

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black
    });

    if (!fontsLoaded) {
        return null; 
    }

    const success = async() => {
        navigation.navigate('SplashScreen')
      }

    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    const handleSignOut = () => {
        console.log('Logout now')
        signOutUser(success, unsuccess)
    } 
    
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={{width: width*1.5, height: height/2.5, backgroundColor: 'black', borderBottomLeftRadius: 300, borderBottomRightRadius: 300}}>
                        <View style={{flex:1, justifyContent:'flex-end', marginBottom:20}}>
                            <TouchableOpacity style={{width:150,height:150, borderWidth:3, borderColor:'white', position:'absolute',left:'50%', borderRadius:100,
                                        marginLeft: -75,marginBottom: -75}}
                                onPress={selectImage}
                            > 
                                {selectedImage ? (<Image source={{uri:selectedImage.uri}}
                                                        style={{ width: 144, height: 144, borderRadius: 72 }}/>) : null}
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.4, marginHorizontal:'25%'}}>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>{firstName}</Text>
                            <Text style={{fontFamily:'Roboto_900Black',textAlign:'center', color:'white', fontWeight:'bold', fontSize:16}}>{lastName}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:3}}>
                        {fullName && email ? (
                            <View style={{flex:1, marginTop:10, marginHorizontal:25}}>
                            <EditComp value={fullName} uid={userUID} edit="fullname" placeholder="FULLNAME" email={email}/>
                            <EditComp value={user[0].weight.toString()} uid={userUID} edit="weight" placeholder="WEIGHT(KG)" email={email}/>
                            <EditComp value={email} uid={userUID} edit="email" />
                            </View>
                        ) : (
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text>Loading...</Text>
                            </View>
                        )}
                    </View>
                    <View style={{flex:1, paddingBottom:8}}>
                        <TouchableOpacity style={{flex:1, backgroundColor:'#DC143C', justifyContent:'center', borderRadius:20, marginVertical:12, marginHorizontal:25}}
                            onPress={handleSignOut}
                        >
                            <Text style={{fontFamily:'Roboto_900Black', textAlign:'center', color:'white', fontSize:16}}>SIGN OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}