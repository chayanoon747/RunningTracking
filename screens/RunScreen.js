import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export const RunScreen = () => {
    const { width, height } = Dimensions.get('window');

    const [iconName, setIconName] = useState('play-circle');
    //ตั้งเป็น true ไว้เพราะแค่จะ test UI เฉยๆ
    //ถ้าต้องการดึง google map ให้ตั้งเป็น false
    const [location, setLocation] = useState(true);
    const [isMapViewExpanded, setIsMapViewExpanded] = useState(true);
  

    const toggleButton = () => {
        if (iconName === 'play-circle') {
        setIconName('pause-circle');
        } else {
        setIconName('play-circle');
        }
    };

    const MapViewExpanded = ()=>{
        if(isMapViewExpanded == true){
            return(
                <TouchableOpacity style={{flex:1}} 
                    onPress={()=>{
                        setIsMapViewExpanded(!isMapViewExpanded)
                    }}
                >
                    {/*
                    <MapView
                        style={{ flex:1 }} // กำหนดความกว้างและความสูงให้เท่ากับขนาดหน้าจอ
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomEnabled={false} // ปิดการขยายแผนที่
                        scrollEnabled={false}
                    >
                        <Marker
                            coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            }}
                            title="ตำแหน่งปัจจุบัน"
                            description="คุณอยู่ที่นี่"
                        />
                    </MapView>
                    */}
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={{flex:1}}>
                    
                    {/*<MapView
                        style={{ flex:1 }} // กำหนดความกว้างและความสูงให้เท่ากับขนาดหน้าจอ
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomEnabled={true} 
                        scrollEnabled={true}
                    >*/}
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            style={{flex:1, position: 'absolute',bottom: 0,right: 0,backgroundColor: 'transparent',
                                    borderRadius: 20,padding: 20,
                            }}
                            onPress={() => {
                                setIsMapViewExpanded(!isMapViewExpanded)
                            }}
                        >
                            <AntDesign name="closecircleo" size={60} color="black" />
                        </TouchableOpacity>
                        {/*<Marker
                            coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            }}
                            title="ตำแหน่งปัจจุบัน"
                            description="คุณอยู่ที่นี่"
                        />
                        */}
                    </View>
                    {/*</MapView>*/}
                
                </View>
            )
        }
    }
    /*
    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('ไม่ได้รับอนุญาตให้เข้าถึงตำแหน่ง');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        } catch (error) {
        console.error(error);
        }
    };
    */
    return (
        <View style={{ flex: 1 }}>
        <View style={{ flex:1, borderWidth: 3, borderColor: 'red' }}>
            {/*
            {location ? (
                <Text style={{ fontSize: 16 }}>
                Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                </Text>
            ) : (
                <Text style={{ fontSize: 16 }}>กำลังดึงตำแหน่ง...</Text>
            )}
            */}
        
            {location && (
                MapViewExpanded()
            )}
        </View>
        <View style={{ flex: isMapViewExpanded ? 2 : 0, borderWidth: 3, borderColor: 'green' }}>
            <View style={{ flex: 2, borderWidth: 3, borderColor: 'blue' }}></View>
            <View
            style={{
                flex: 1,
                flexDirection: 'row',
                borderWidth: 3,
                borderColor: 'pink',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
            >
            <TouchableOpacity>
                <FontAwesome5 name="stop-circle" size={60} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleButton}>
                <FontAwesome5 name={iconName} size={60} color="black" />
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );
};

    /*const MapViewModal = ({ location }) => (
    <MapView
        style={{ flex: 1 }}
        initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
    >
        <Marker
        coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }}
        title="ตำแหน่งปัจจุบัน"
        description="คุณอยู่ที่นี่"
        />
    </MapView>
);*/

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
});
