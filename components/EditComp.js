import { View, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState } from "react";

export const EditComp = (props)=>{
    const { value } = props;
    const [textValue, setTextValue] = useState(value);
    const [editValue, setEditValue] = useState(false);

    const handleEditPress = () => {
        setEditValue(!editValue);
    };

    const handleTextChange = (text) => {
        setTextValue(text);
      };

    return(
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <TextInput style={{flex:1, backgroundColor:'white', borderWidth:3, borderColor:'black', marginRight:5}}
                editable={editValue} 
                value={textValue} 
                onChangeText={handleTextChange}
                selectionColor="black"
                underlineColor="transparent"
            >
            </TextInput>
            <TouchableOpacity onPress={handleEditPress}>
                {editValue ? (
                    <Feather name="x-circle" size={26} color="black" />
                ) : (
                    <MaterialCommunityIcons name="circle-edit-outline" size={26} color="black" />
                )}
            </TouchableOpacity>                   
        </View>
    )
}