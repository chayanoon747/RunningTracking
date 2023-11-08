import { View, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState } from "react";
import { updateFullName, updateWeight } from '../firebase/UserModel';
import { useDispatch, useSelector } from 'react-redux'
import { addProfile, clearProfile} from '../redux/authSlice'

export const EditComp = (props)=>{
    const dispatch = useDispatch();

    const { value, uid, edit, placeholder, email } = props;
    const [textValue, setTextValue] = useState(value);
    const [editValue, setEditValue] = useState(false);
    

    const handleWeightChange = (weight) => {
        const profileData = {
            uid: uid,
            email: email,
            weight: weight
        };
        dispatch(clearProfile());
        dispatch(addProfile(profileData));
    };

    const handleEditPress = () => {
        setEditValue(!editValue);
        if(editValue){
            if(edit == "fullname"){
                updateFullName(uid, textValue);
            }
            else if(edit == "weight"){
                updateWeight(uid, textValue);
                handleWeightChange(textValue);
            }
        }
    };

    const handleTextChange = (text) => {
        setTextValue(text);
    };

    const CompEditIcon = ()=>{
        if(edit != 'email'){
            if(editValue){ 
                return  <TouchableOpacity onPress={handleEditPress}>
                            <Feather name="x-circle" size={26} color="black" />
                        </TouchableOpacity>  
            }else{
                return  <TouchableOpacity onPress={handleEditPress}>
                            <MaterialCommunityIcons name="circle-edit-outline" size={26} color="black" />
                        </TouchableOpacity>  
            }
        }else{
            return <TouchableOpacity>
                        <MaterialCommunityIcons name="circle-edit-outline" size={26} color="transparent" />
                    </TouchableOpacity>  
        }
        
    }

    return(
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <TextInput style={{flex:1, backgroundColor:'white', borderWidth:3, borderColor:editValue ? 'red' : 'black', marginRight:5, fontSize:15}}
                editable={editValue} 
                value={textValue} 
                onChangeText={handleTextChange}
                selectionColor="black"
                underlineColor="transparent"
                placeholder={placeholder}
                placeholderColor="transparent"
            >
            </TextInput>
            <TouchableOpacity onPress={handleEditPress}>
                {CompEditIcon()}
            </TouchableOpacity>                   
        </View>
    )
}