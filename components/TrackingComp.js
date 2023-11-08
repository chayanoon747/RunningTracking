import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

export const TrackingComp = () => {
    const [location, setLocation] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับสถานะการโหลด
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeInMinute, setTimeInMinute] = useState(0);
    const [timeInSecond, setTimeInSecond] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState(1);
    const [challengeStarted, setChallengeStarted] = useState(false);
    const [showChallengePopup, setShowChallengePopup] = useState(false);

    const trophy = require('../assets/trophy.png')

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
        if (subscription) {
            subscription.remove();
        }
    };

    const startChallenge = () => {
        setChallengeStarted(true);
        startTracking();
    };

    const finishChallenge = () => {
        setIsTracking(false);
        if (subscription) {
            subscription.remove();
        }
    };

    const closeChallengePopup = () => {
        setShowChallengePopup(false);
    };

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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? (
                <Text style={styles.loadingText}>กำลังดึงตำแหน่ง...</Text>
            ) : location ? (
                <View style={styles.trackingContainer}>
                    <Text style={styles.challengeInfo}>
                        Goal: {selectedGoal} km
                    </Text>

                    <Picker
                        selectedValue={selectedGoal}
                        onValueChange={(itemValue, itemIndex) => setSelectedGoal(itemValue)}
                        style={{ marginVertical:-75}}
                    >
                        <Picker.Item label="0.1 km" value={0.1} />
                        <Picker.Item label="0.2 km" value={0.2} />
                        <Picker.Item label="0.3 km" value={0.3} />
                        <Picker.Item label="0.4 km" value={0.4} />
                        <Picker.Item label="0.5 km" value={0.5} />
                        <Picker.Item label="0.6 km" value={0.6} />
                        <Picker.Item label="0.7 km" value={0.7} />
                        <Picker.Item label="0.8 km" value={0.8} />
                        <Picker.Item label="0.9 km" value={0.9} />
                        <Picker.Item label="1 km" value={1} />
                    </Picker>
    
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
                    <Text style={{ fontStyle: 'italic',textDecorationLine:'underline', marginBottom: 5 }}>Show Location</Text>
                    </TouchableOpacity>
                    {showLocationInfo ? (
                        <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
                            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                        </Text>
                    ) : null}
    
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
    
                    {challengeStarted ? (
                        <Button
                            title="Finish Challenge"
                            onPress={() => {
                                if (calculateTotalDistance() > selectedGoal) { // 0.1 -> 1 km
                                    finishChallenge();
                                    setShowChallengePopup(true);
                                }
                            }}
                            disabled={!isTracking}
                        />
                    ) : (
                        <Button
                            title="Start Challenge"
                            onPress={startChallenge}
                            disabled={!location}
                        />
                    )}
    
                    
                </View>
            ) : (
                <Text style={styles.errorText}>ไม่สามารถดึงตำแหน่งได้</Text>
            )}

        <Modal visible={showChallengePopup} animationType="slide" transparent={true}>
            <View style={styles.challengePopup}>
                <Image source={trophy} style={styles.trophyIcon} />
                <Text style={styles.challengeText}>ยินดีด้วยยย!!</Text>
                <Text style={styles.challengeText}>คุณทำ Challenge วันนี้สำเร็จ!</Text>
                <View style={styles.dataContainer}>
                        <Text style={styles.dataText}> • Distance: {calculateTotalDistance().toFixed(2)} กิโลเมตร</Text>
                        <Text style={styles.dataText}> • Time: {timeInMinute}:{timeInSecond} นาที</Text>
                        <Text style={styles.dataText}> • Pace: {calculatePace().toFixed(2)} นาที/กิโลเมตร</Text>
                        <Text style={styles.dataText}> • Calories: {calculateCaloriesBurned().toFixed(2)} กิโลแคลอรี</Text>
                </View>
                <Button title="Close" onPress={closeChallengePopup} />
            </View>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    trackingContainer: {
        flex: 1,
    },
    coordinatesText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
    },
    dataContainer: {
        margin: 10,
    },
    dataText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    challengeInfo: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight:'bold',
    },
    challengePopup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    trophyIcon: {
        width: 200,
        height: 200,
    },
    challengeText: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
    },
});

