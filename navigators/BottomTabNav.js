import { Image, View, Text } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RunScreen } from '../screens/RunScreen';
import { StatScreen } from "../screens/StatScreen";
import { ProfileScreen } from '../screens/ProfileScreen';
import {Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

export const BottomTabNav = ()=>{
    const BottomTab = createBottomTabNavigator()
    return (
        <BottomTab.Navigator 
            initialRouteName='RunScreen'
            screenOptions={{
                tabBarActiveTintColor:'black',
                tabBarInactiveTintColor:'gray',
            }}
            >
          <BottomTab.Screen name="HomeScreen" component={HomeScreen} 
            options={{
                title:'CHALLENGE',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <MaterialCommunityIcons name={focused ? 'fire-circle':'fire'} color={color} size={size}/>
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>CHALLENGE</Text>
                  )
                },
            }}
          />
          <BottomTab.Screen name="RunScreen" component={RunScreen} 
            options={{
                title:'RUNNING',
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
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>RUNNING</Text>
                  )
                },
            }}
          />
          <BottomTab.Screen name="StatScreen" component={StatScreen} 
            options={{
                title:'STATISTICS',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <Ionicons name={focused ? 'bar-chart':'bar-chart-outline'} size={size} color={color}/>
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>STATISTICS</Text>
                  )
                },
            }}
          />
          <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} 
            options={{
                title:'PROFILE',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <FontAwesome name={focused ? 'user-circle':'user-circle-o'} size={size} color={color} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>PROFILE</Text>
                  )
                },
            }}
          />
        </BottomTab.Navigator>
        
      );
}