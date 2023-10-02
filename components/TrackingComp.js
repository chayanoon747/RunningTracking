import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export const TrackingComp = () => {
    const [location, setLocation] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับสถานะการโหลด

    let subscription = null;

    const haversine = (lat1, lon1, lat2, lon2) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
        };

        const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // ระยะทางระหว่างจุดทั้งสองในหน่วยกิโลเมตร
        return distance;
    };

    const calculateTotalDistance = () => {
        let totalDistance = 0;
        for (let i = 1; i < coordinates.length; i++) {
            const prevCoordinate = coordinates[i - 1];
            const currentCoordinate = coordinates[i];
            totalDistance += haversine(
                prevCoordinate.latitude,
                prevCoordinate.longitude,
                currentCoordinate.latitude,
                currentCoordinate.longitude
            );
        }
        return totalDistance;
    };

    const calculatePace = () => {
        if (coordinates.length < 2) {
            return 0; // ไม่สามารถคำนวณ Pace ได้เมื่อมีน้อยกว่า 2 จุดตำแหน่ง
        }

        const totalDistance = calculateTotalDistance(); // ระยะทางรวมในหน่วยกิโลเมตร
        const totalTimeInMinutes = (coordinates.length - 1) * 10 / 60; // หน่วยเวลาในนาที

        return totalDistance / totalTimeInMinutes;
    };

    const startTracking = async () => {
        setIsTracking(true);

        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                },
                (location) => {
                    setCoordinates((prevCoordinates) => [
                        ...prevCoordinates,
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
        <View style={{ flex: 1 }}>
            {loading ? (
                <Text style={{ fontSize: 16 }}>กำลังดึงตำแหน่ง...</Text>
            ) : location ? (
                <>
                    <Text style={{ fontSize: 16 }}>
                        Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                    </Text>
                    <MapView
                        style={{ flex: 1 }}
                        region={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Polyline
                            coordinates={coordinates}
                            strokeWidth={5}
                            strokeColor="blue"
                        />
                        {coordinates.length > 0 && (
                            <Marker
                                coordinate={coordinates[coordinates.length - 1]}
                                title="Current Location"
                            />
                        )}
                    </MapView>
                </>
            ) : (
                <Text>ไม่สามารถดึงตำแหน่งได้</Text>
            )}
            
            <Button
                title={isTracking ? 'หยุด' : 'เริ่ม'}
                onPress={isTracking ? stopTracking : startTracking}
                disabled={!location} // ปิดการใช้งานปุ่มเริ่ม/หยุด ถ้าไม่มีข้อมูลตำแหน่ง
            />
            <Text>ระยะทางรวม: {calculateTotalDistance().toFixed(2)} กิโลเมตร</Text>
            <Text>Pace: {calculatePace().toFixed(2)} นาที/กิโลเมตร</Text>
        </View>
    );
};
