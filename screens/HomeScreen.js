import { View, Text } from "react-native"
import { TrackingComp } from '../components/TrackingComp';
export const HomeScreen = ()=>{
    return(
        <View style={{flex:1}}>
            <TrackingComp/>
        </View>
    )
}