import { Image, View, Text } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RunScreen } from '../screens/RunScreen';
import { RecordScreen } from '../screens/RecordScreen';
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
                title:'HomeScreen',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <Ionicons name={focused ? 'home':'home-outline'} color={color} size={size}/>
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>HomeScreen</Text>
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
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>HomeScreen</Text>
                  )
                },
            }}
          />
          <BottomTab.Screen name="RecordScreen" component={RecordScreen} 
            options={{
                title:'RecordScreen',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <MaterialCommunityIcons name={focused ? 'record-circle':'record-circle-outline'} size={size} color={color}/>
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>HomeScreen</Text>
                  )
                },
            }}
          />
          <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} 
            options={{
                title:'ProfileScreen',
                tabBarIcon:({focused, color, size})=>{
                    return(
                      <FontAwesome name={focused ? 'user-circle':'user-circle-o'} size={size} color={color} />
                    )
                },
                tabBarLabel:({focused, color, size})=>{
                  return(
                    <Text style={{ fontWeight: focused ? 'bold' : 'normal', fontSize:10}} color={color} size={size}>HomeScreen</Text>
                  )
                },
            }}
          />
        </BottomTab.Navigator>
        
      );
}