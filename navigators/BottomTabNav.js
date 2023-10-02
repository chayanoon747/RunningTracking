import { Image, View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RunScreen } from '../screens/RunScreen';
import { RecordScreen } from '../screens/RecordScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import {Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

export const BottomTabNav = ()=>{
    const BottomTab = createBottomTabNavigator()
    const userIcon = require('../assets/user.png')
    const userOutlineIcon = require('../assets/user_outline.png')

    return (
        <BottomTab.Navigator 
            initialRouteName='RunScreen'
            screenOptions={{
                tabBarActiveTintColor:'purple',
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
                      <MaterialCommunityIcons name={focused ? 'record-circle':'record-circle-outline'} size={size} color={color}/>
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
            }}
          />
        </BottomTab.Navigator>
        
      );
}