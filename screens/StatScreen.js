import { View, Text, ScrollView } from "react-native"

export const StatScreen = ()=>{
    return(
        <ScrollView style={{flex:1}}>
            <View style={{height:150, width:'100%', padding:20, backgroundColor:'white', marginBottom:5}}>
                <View style={{flex:0.2, flexDirection:'row'}}>
                    <Text>Saturday, August 05 2006</Text>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text>6:54 P.M.</Text>
                    </View>
                   
                </View>
                
                <View style={{flex:1, borderWidth:3, borderColor:'black'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'black'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>45:24</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>DURATION</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>4.3 km</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>DISTANCE</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', borderTopWidth:3, borderColor:'black'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'black'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>800</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>CALORIES</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>9'08"</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>AVG. PACE</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{height:150, width:'100%', padding:20, backgroundColor:'white', marginBottom:10}}>
                <View style={{flex:0.2, flexDirection:'row'}}>
                    <Text>Saturday, August 05 2006</Text>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text>6:54 P.M.</Text>
                    </View>
                   
                </View>
                
                <View style={{flex:1, borderWidth:3, borderColor:'black'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'black'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>45:24</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>DURATION</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>4.3 km</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>DISTANCE</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', borderTopWidth:3, borderColor:'black'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'black'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>800</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>CALORIES</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontFamily:'Roboto_700Bold'}}>9'08"</Text>
                            <Text style={{fontSize:12, fontFamily:'Roboto_500Medium', color:'gray'}}>AVG. PACE</Text>
                        </View>
                    </View>
                </View>
            </View>

            
            
            
            
        </ScrollView>
    )
}