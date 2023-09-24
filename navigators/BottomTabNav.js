import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RunScreen } from '../screens/RunScreen';
import { RecordScreen } from '../screens/RecordScreen';
import {Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

export const BottomTabNav = ()=>{
    const BottomTab = createBottomTabNavigator()
    return (
        <BottomTab.Navigator 
            initialRouteName='RunScreen'
            screenOptions={{
                tabBarActiveTintColor:'blue',
                tabBarInactiveTintColor:'gray',
            }}
            >
          <BottomTab.Screen name="HomeScreen" component={HomeScreen} 
            options={{
                title:'HomeScreen',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <Ionicons name={focused ? 'home':'home-outline'} color={color} size={size}/>
                    )
                  },
            }}
          />
          <BottomTab.Screen name="RunScreen" component={RunScreen} 
            options={{
                title:'RunScreen',
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
          <BottomTab.Screen name="RecordScreen" component={RecordScreen} 
            options={{
                title:'RecordScreen',
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