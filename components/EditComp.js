import { View, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const EditComp = (props)=>{
    const { value } = props;
    return(
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <TextInput style={{flex:1, backgroundColor:'white'}}
                editable={false} value={value}>
            </TextInput>
            <TouchableOpacity>
                <MaterialCommunityIcons name="circle-edit-outline" size={24} color="black" />
            </TouchableOpacity>
                                
        </View>
    )
}