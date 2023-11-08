import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';

export const RunScreen = ({navigation}) => {
    const { width, height } = Dimensions.get('window');

    const [iconName, setIconName] = useState('play-circle');
    //ตั้งเป็น true ไว้เพราะแค่จะ test UI เฉยๆ
    //ถ้าต้องการดึง google map ให้ตั้งเป็น false
    //const [location, setLocation] = useState(false);
    const [isMapViewExpanded, setIsMapViewExpanded] = useState(true);

    const [location, setLocation] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับสถานะการโหลด
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeInMinute, setTimeInMinute] = useState(0);
    const [timeInSecond, setTimeInSecond] = useState(0);
    let subscription = null;

    const [showLocationInfo, setShowLocationInfo] = useState(false);
    
    useEffect(() => {
        let timerId;
        
        if (isTracking) {
          timerId = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1000); // เพิ่มเวลาทุกวินาที
            setTimeInSecond((prevTimeInSecond) => {
                if (prevTimeInSecond === 59) {
                  setTimeInMinute((prevTimeInMinute) => prevTimeInMinute + 1);
                  return 0;
                }
                return prevTimeInSecond + 1;
            });
          }, 1000);
        } else {
          clearInterval(timerId); // หยุดการอัปเดตเวลา
        }
    
        return () => {
          clearInterval(timerId); // หยุดการอัปเดตเวลาเมื่อคอมโพเนนต์ถูกทำลาย
        };
    }, [isTracking, timeElapsed, timeInSecond, timeInMinute]);

    const resetTimer = () => {
        setTimeElapsed(0);
    };

    //ใช้สำหรับกดปุ่มสี่เหลี่ยม (reset)
    const resetAll = () => {
        resetTimer();
        setTimeInMinute(0);
        setTimeInSecond(0);
        setCoordinates([]); //reset ข้อมูลตำแหน่งที่ถูกเก็บไว้ใน Array coordinates ให้เป็นอาร์เรย์ว่าง [] เพื่อเริ่มตำแหน่งใหม่หลังจากการรีเซ็ต
    };

    // คำนวณระยะทางระหว่างสองจุดบนผิวโลก (โดยใช้ละติจูดและลองจิจูด) 
    const haversine = (lat1, lon1, lat2, lon2) => {

        // แปลง degree(องศา) -> radius
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
        };

        const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร
        const dLat = deg2rad(lat2 - lat1); // ค่าความแตกต่างระหว่างละติจูดของจุดที่สองกับจุดที่หนึ่ง
        const dLon = deg2rad(lon2 - lon1); // ค่าความแตกต่างระหว่างลองจิจูดของจุดที่สองกับจุดที่หนึ่ง

        // คูณ 2 รอบ คือ แทนการยกกำลังสอง
        // สูตร (Math.sin(dLat / 2) ยกกำลังสอง) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * (Math.sin(dLon / 2) ยกกำลังสอง)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // ค่ามุมระหว่างจุดที่สองบนผิวโลก
        const distance = R * c; // ระยะทางระหว่างจุดทั้งสองในหน่วยกิโลเมตร
        return distance;
    };

    // คำนวณระยะทางรวมของเส้นทางที่ผู้ใช้เคลื่อนที่ 
    const calculateTotalDistance = () => {
        let totalDistance = 0; // เก็บระยะทางรวมของเส้นทาง
        for (let i = 1; i < coordinates.length; i++) {
            const prevCoordinate = coordinates[i - 1]; //ดึงจุดตำแหน่ง prev
            const currentCoordinate = coordinates[i]; //ดึงจุดตำแหน่ง current
            totalDistance += haversine(
                prevCoordinate.latitude,
                prevCoordinate.longitude,
                currentCoordinate.latitude,
                currentCoordinate.longitude
            );
        }
        return totalDistance; // ระยะทางในหน่วยกิโลเมตร
    };

    const calculateTotalTime = () => {
        /*const totalTimeInMinutes = (coordinates.length) * 10 / 60; // หน่วยเวลาในนาที

        return totalTimeInMinutes;*/
    }

    const calculatePace = () => {
        if (coordinates.length < 2) {
            return 0; // ไม่สามารถคำนวณ Pace ได้เมื่อมีน้อยกว่า 2 จุดตำแหน่ง
        }

        const totalDistance = calculateTotalDistance(); // ระยะทางรวมในหน่วยกิโลเมตร
        const totalTimeInMinutes = calculateTotalTime();

        return totalTimeInMinutes / totalDistance;
    };

    const calculateMETs = () => {
        const totalDistance = calculateTotalDistance(); 
        const totalTimeInMinutes = calculateTotalTime();
        const speedInKilometerPerHour = (60 / totalTimeInMinutes) * totalDistance;
        if(speedInKilometerPerHour <= 30){
            if(speedInKilometerPerHour > 13 ){
                return 14;
            }else if(speedInKilometerPerHour > 10){
                return 12.4;
            }else if(speedInKilometerPerHour > 7){
                return 9.6;
            }else if(speedInKilometerPerHour > 6){
                return 6.2;
            }else if(speedInKilometerPerHour > 4){
                return 4.1;
            }else{
                return 2.4;
            }
        }else{
            return 0;
        }
    }

    const calculateCaloriesBurned = () => {
        const weightInKilograms = 50;
        const totalTimeInMinutes = calculateTotalTime();
        const METs = calculateMETs();
        const caloriesBurned = METs * 0.0175 * weightInKilograms * totalTimeInMinutes // คำนวณแคลอรี่ที่เผาผลาญ
    
        return caloriesBurned;
    };

    const startTracking = async () => {
        setIsTracking(true);
        setIconName('pause-circle');

        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
            // Location.watchPositionAsync การเรียกฟังก์ชันนี้จะสร้าง subscription เพื่อติดตามการเคลื่อนไหวของผู้ใช้
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High, // เพื่อให้ความแม่นยำในการติดตามตำแหน่งสูงสุด
                    distanceInterval: 10, // จะส่งการอัปเดตตำแหน่งใหม่ไปยังฟังก์ชันที่ระบุทุกครั้งที่ผู้ใช้เคลื่อนที่ 10 เมตร
                },
                // สร้าง object location ที่เก็บข้อมูลตำแหน่งของผู้ใช้: latitude และ longitude
                (location) => {
                    // นำเข้อมูลตำแหน่งเดิม (ที่อยู่ใน coordinates) มาและเพิ่มข้อมูลใหม่ลงไปในอาร์เรย์ coordinates
                    setCoordinates((prevCoordinates) => [
                        ...prevCoordinates,
                        // สร้างออบเจ็กต์ใหม่ที่ประกอบด้วย latitude และ longitude จากตำแหน่งใหม่ที่ได้จาก location.coords
                        {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        },
                    ]);

                    setLocation(location); // อัปเดตตำแหน่งปัจจุบันใน state
                }
            );
        } else {
            console.error('Permission to access location was denied');
        }
    };

    const stopTracking = () => {
        setIsTracking(false);
        setIconName('play-circle');
        if (subscription) {
            subscription.remove();
        }
    };

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
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={{flex:1}} 
                    onPress={()=>{
                        setIsMapViewExpanded(!isMapViewExpanded)
                    }}
                >
                    <MapView
                        style={{ flex:1 }} // กำหนดความกว้างและความสูงให้เท่ากับขนาดหน้าจอ
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomEnabled={true} // ปิดการขยายแผนที่
                        scrollEnabled={true}
                    >
                        <TouchableOpacity
                            style={{flex:1, position: 'absolute',bottom: 0,right: 0,backgroundColor: 'transparent',
                                    borderRadius: 20,padding: 20}}
                            onPress={() => {
                                setIsMapViewExpanded(!isMapViewExpanded)
                            }}
                        >
                            <AntDesign name="closecircleo" size={25} color="gray" />
                        </TouchableOpacity>

                        <Marker
                            coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            }}
                            title="ตำแหน่งปัจจุบัน"
                            description="คุณอยู่ที่นี่"
                        />
                    </MapView>
                </View>
            )
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('ไม่ได้รับอนุญาตให้เข้าถึงตำแหน่ง');
                setLoading(false); // หยุดโหลดหลังจากตรวจสอบสถานะอนุญาต
                return;
            }

            const initialLocation = await Location.getCurrentPositionAsync({});
            setLocation(initialLocation); // อัปเดตตำแหน่งเริ่มต้นใน state
            setLoading(false); // หยุดโหลดหลังจากได้ตำแหน่ง
        } catch (error) {
            console.error(error);
            setLoading(false); // หยุดโหลดหลังจากเกิดข้อผิดพลาด
        }
    };
    
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

    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black
    });

    if (!fontsLoaded) {
        return null; 
    }
    
    return (
        <View style={{ flex:1, backgroundColor:'white' }}>
            <View style={{flex:1}}>
            <TouchableOpacity
                style={{
                    borderRadius: showLocationInfo ? 20 : 0, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                }}
                onPress={() => {
                    setShowLocationInfo(!showLocationInfo);
                }}
            >
                <Text style={{fontStyle:'italic',marginVertical:5 }}>Show Location</Text>
            </TouchableOpacity>
                {showLocationInfo && location ? (
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
                Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
            </Text>
        ) : null}
            
                {location && (
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="blue" />
                    {coordinates.length > 0 && (
                        <Marker coordinate={coordinates[coordinates.length - 1]} title="Current Location" />
                    )}
                </MapView>
                )}
            </View>

            <View style={{ flex: isMapViewExpanded ? 1.5 : 0}}>
                <View style={{ flex: 2, borderWidth:3, borderColor:'lightgray'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'lightgray'}}>
                            <Text style={{fontSize:24, fontFamily:'Roboto_700Bold'}}> {timeInMinute}:{timeInSecond} minutes</Text>
                            <Text style={{fontSize:16, fontFamily:'Roboto_500Medium', color:'gray'}}>DURATION</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:24, fontFamily:'Roboto_700Bold'}}> {calculateTotalDistance().toFixed(2)} km </Text>
                            <Text style={{fontSize:16, fontFamily:'Roboto_500Medium', color:'gray'}}>DISTANCE</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', borderTopWidth:3, borderColor:'lightgray'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:3, borderColor:'lightgray'}}>
                            <Text style={{fontSize:24, fontFamily:'Roboto_700Bold'}}> {calculateCaloriesBurned().toFixed(2)} </Text>
                            <Text style={{fontSize:16, fontFamily:'Roboto_500Medium', color:'gray'}}>CALORIES</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:24, fontFamily:'Roboto_700Bold'}}> {calculatePace().toFixed(2)} </Text>
                            <Text style={{fontSize:16, fontFamily:'Roboto_500Medium', color:'gray'}}>AVG. PACE</Text>
                        </View>
                    </View>
                </View>
                <View
                style={{flex: 1,flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
               <TouchableOpacity onPress={resetAll}>
                    <FontAwesome5 name="stop-circle" size={60} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity onPress={isTracking ? stopTracking : startTracking}>
                    <FontAwesome5 name={iconName} size={60} color="gray" />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};




