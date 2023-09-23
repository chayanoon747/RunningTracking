import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RunScreen } from '../screens/RunScreen';
import { RecordScreen } from '../screens/RecordScreen';
import {Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

export const BottomTabNav = ()=>{
    const BottomTab = createBottomTabNavigator()
    return (
        <BottomTab.Navigator 
            initialRouteName='Run'
            screenOptions={{
                tabBarActiveTintColor:'blue',
                tabBarInactiveTintColor:'gray',
            }}
            >
          <BottomTab.Screen name="Home" component={HomeScreen} 
            options={{
                title:'Home',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <Ionicons name={focused ? 'home':'home-outline'} color={color} size={size}/>
                    )
                  },
            }}
          />
          <BottomTab.Screen name="Run" component={RunScreen} 
            options={{
                title:'Run',
                tabBarIcon:({focused, color, size})=>{
                    if(focused){
                        return(
                            <FontAwesome5 name="walking" size={size} color={color} />
                        )
                    }
                    else{
                        return(
                            <Ionicons name="walk" size={size} color={color} />
                        )
                    }
                },
                
            }}
          />
          <BottomTab.Screen name="Record" component={RecordScreen} 
            options={{
                title:'Record',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <MaterialCommunityIcons name={focused ? 'record-circle':'record-circle-outline'} color={color} size={size}/>
                    )
                  },
            }}
          />
        </BottomTab.Navigator>
      );
}