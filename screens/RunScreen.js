import { View, Text, TouchableOpacity } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react'

export const RunScreen = ()=>{
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, borderWidth:3, borderColor:'red'}}>
                
            </View>
            <View style={{flex:2, borderWidth:3, borderColor:'green'}}>
                <View style={{flex:2, borderWidth:3, borderColor:'blue'}}>

                </View>
                <View style={{flex:1, flexDirection:'row',borderWidth:3, borderColor:'pink', justifyContent:'space-around', alignItems:'center'}}>
                    <TouchableOpacity>
                        <FontAwesome5 name="pause-circle" size={60} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name="play-circle" size={60} color="black" />
                    </TouchableOpacity>
                    
                    
                </View>
            </View>
        </View>
    )
}