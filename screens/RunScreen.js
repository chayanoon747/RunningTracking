import { View, Text, TouchableOpacity } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react'



export const RunScreen = ()=>{

    const [iconName, setIconName] = useState('play-circle')

    const toggleButton = ()=>{
        if(iconName == 'play-circle'){
            setIconName('pause-circle')
        }else{
            setIconName('play-circle')
        }
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1, borderWidth:3, borderColor:'red'}}>
                
            </View>
            <View style={{flex:2, borderWidth:3, borderColor:'green'}}>
                <View style={{flex:2, borderWidth:3, borderColor:'blue'}}>

                </View>
                <View style={{flex:1, flexDirection:'row',borderWidth:3, borderColor:'pink', justifyContent:'space-around', alignItems:'center'}}>
                    
                    <TouchableOpacity>
                        <FontAwesome5 name="stop-circle" size={60} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleButton}>
                        <FontAwesome5 name={iconName} size={60} color="black" />
                    </TouchableOpacity>
                    
                    
                    
                </View>
            </View>
        </View>
    )
}